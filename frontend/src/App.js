import React, { useState } from 'react';
import './App.css';
import Quiz from './Quiz';
import Result from './Result';

function App() {
  const [character, setCharacter] = useState(null);
  const generateCharacter = async (answers) => {
    try {
      const response = await fetch('http://127.0.0.1:5000/generate-character', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ answers })
      });

      if (!response.ok) {
        throw new Error('Failed to generate character');
      }

      const data = await response.json();
      setCharacter(data); 
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="App">
      <h1>What Singles Inferno Character Are You?</h1>
      {!character ? (
        <Quiz onGenerate={generateCharacter} />
      ) : (
        <Result characterData={character} />
      )}
    </div>
  );
}

export default App;
