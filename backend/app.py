from flask import Flask, request, jsonify
import sqlite3
import os
from dotenv import load_dotenv
import requests

app = Flask(__name__)

#Load env and retrieve API key
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
def generate_character():
    #TODO: Parse json request and call LLM API to generate character based on keywords
    
    return jsonify({"message": "Placeholder"})

if __name__ == "__main__":
    root()
    init_db()
    app.run(debug=True)
