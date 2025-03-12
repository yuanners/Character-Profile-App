# Character-Profile-Generator
This is a full-stack application that generates character profiles using an LLM API, stores them in a database, and displays them in a React frontend. 
The application allows users to take a quiz, generate a character match, and view saved character profiles.

## App Demo
![App Demo](assets/demo.gif)

## Setup Instructions

### 1. Install Dependencies

Backend Setup
```
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\bin\activate
pip install -r requirements.txt
```
Frontend Setup

```
cd frontend
npm install
```

### 2. Set Up Environment Variables

Create a ```.env``` file inside the ```backend/``` folder with the following values:
Make sure you have a valid API key to use the [Awan LLM models](https://www.awanllm.com/).

```
API_KEY=<your-API-key>
```

### 3. Run the Application

Start the Backend Server
```
cd backend
flask run
```
Start the Frontend Server
```
cd frontend
npm start
```
The frontend will run at [http://localhost:3000](http://localhost:3000) and the backend at [http://127.0.0.1:5000](http://127.0.0.1:5000).
