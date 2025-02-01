from flask import Flask, request, jsonify
from flask_cors import CORS
import sqlite3
import os
from dotenv import load_dotenv
import requests

app = Flask(__name__)
CORS(app)

#Load environment and retrieve API key for security
load_dotenv()
API_KEY = os.getenv("LLM_API_KEY")

DATABASE = "characters.db"

#Initialise database
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
    print("Database initialised successfully.")


@app.route('/')
def root():
    return "Root directory."

#Post request for generated result 
@app.route('/generate-character', methods=['POST'])
def character():
    try:
        # 1. Parse JSON request
        data = request.get_json()
        answers = data.get("answers", [])
        if not answers:
            return jsonify({"error": "Missing field"}), 400
        print(answers)

        return jsonify({
            "name": "-",
            "age": "-",
            "hobby": "-",
            "summary":"-"
        }), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
if __name__ == "__main__":
    root()
    init_db()
    app.run(debug=True)
