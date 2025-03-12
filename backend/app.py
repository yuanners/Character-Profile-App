from flask import Flask, request, jsonify
from flask_cors import CORS
import sqlite3
import os
from dotenv import load_dotenv
import requests
import json
import re

app = Flask(__name__)
CORS(app)


load_dotenv()
API_KEY = os.environ.get('API_KEY')
DATABASE = "characters.db"

def init_db():
    with sqlite3.connect(DATABASE) as conn:
        conn.execute("""
            CREATE TABLE IF NOT EXISTS characters (
                id INTEGER PRIMARY KEY,
                name TEXT,
                age INTEGER,
                hobby TEXT
            )
        """)


@app.route('/')
def root():
    return "Root directory."


@app.route('/generate-character', methods=['POST'])
def character():
    try:
        data = request.get_json()
        answers = data.get("answers", [])
        if not answers:
            return jsonify({"error": "Missing field"}), 101
        
        prompt = f"""
        You are a personality quiz AI that assigns the closest Singles Inferno character (cast or MC from all 3 seasons) based on user answers. Based on these answers: {answers}, which Singles Inferno character is the closest match?

        Please respond with the following information in the exact format:

        - **Name**: [Character's name]
        - **Age**: [Character's age]
        - **Hobbies**: [List of character's hobbies]
        - **Personality Traits**: [Short paragraph describing the character's personality traits]

        Make sure the response strictly follows this format for easy parsing. Thank you!
        """

        url = "https://api.awanllm.com/v1/chat/completions"
        payload = json.dumps({
            "model": "Awanllm-Llama-3-8B-Cumulus",
            "messages": [
                {"role": "system", "content": "You are a helpful assistant."},
                {"role": "user", "content": prompt}
            ],
            "temperature": 0.7,
            "top_p": 0.9,
            "top_k": 40,
            "max_tokens": 1024,
            "stream": False
        })
        headers = {
            'Content-Type': 'application/json',
            'Authorization': f"Bearer {API_KEY}"
        }

        if not API_KEY:
            return jsonify({"error": "API key is not set in environment variables"}), 102

        response = requests.request("POST", url, headers=headers, data=payload)
        if response.status_code != 200:
            return jsonify({"error": "Failed to fetch data from LLM API", "status_code": response.status_code}), 103

        try:
            result = response.json()
        except json.JSONDecodeError:
            return jsonify({"error": "Invalid JSON response from LLM API", "response_text": response.text}), 104

        
        character_response = result.get("choices", [{}])[0].get("message", {}).get("content", "Error generating response.")
        print("Extracted Character Response:", character_response) 

        name_match = re.search(r"\*\*Name\*\*:\s*(.*?)(?=\n|$)", character_response)
        age_match = re.search(r"\*\*Age\*\*:\s*(\d+)", character_response)
        hobbies_match = re.search(r"\*\*Hobbies\*\*:\s*(.*?)(?=\n|$)", character_response)
        traits_match = re.search(r"\*\*Personality Traits\*\*:\s*(.*?)(?=\n|$)", character_response)

        name = name_match.group(1) if name_match else "Unknown Name"
        age = age_match.group(1) if age_match else "Unknown Age"
        hobbies = hobbies_match.group(1) if hobbies_match else "Unknown Hobbies"
        traits = traits_match.group(1) if traits_match else "No personality traits found."

        try:
            with sqlite3.connect(DATABASE) as conn:
                cursor = conn.cursor()
                cursor.execute("""
                    INSERT INTO characters (name, age, hobby) VALUES (?, ?, ?)
                """, (name, age, hobbies))
                conn.commit()
        except sqlite3.DatabaseError as db_error:
            return jsonify({"error": f"Unable to connect to database: {str(db_error)}"}), 105

        return jsonify({
            "name": name,
            "age": age,
            "hobbies": hobbies,
            "personality_traits": traits
        })

    except Exception as e:
        print(f"Exception Occurred: {e}")  
        return jsonify({"error": str(e)}), 106
    
@app.route('/get-profiles', methods=['GET'])
def get_profiles():
    try:
        with sqlite3.connect(DATABASE) as conn:
            cursor = conn.cursor()
            cursor.execute("SELECT * FROM characters")
            characters = cursor.fetchall()
            formatted_characters = [
                {"id": character[0], "name": character[1], "age": character[2], "hobby": character[3]} 
                for character in characters
            ]
            return jsonify(formatted_characters)
    except Exception as e:
        return jsonify({"Unable to load data from database": str(e)}), 500

if __name__ == "__main__":
    root()
    init_db()
    app.run()
