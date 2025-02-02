import React from 'react';
import './Result.css';
const Result = ({ characterData }) => {
  if (!characterData || !characterData.name) {
    return <div>Loading...</div>;
  }

  const { name, age, hobbies, personality_traits } = characterData;

  return (
    <div className="result-container">
      <h2>You are {name}!</h2>
      <p><strong>Age:</strong> {age}</p>
      <p><strong>Hobbies:</strong> {hobbies}</p>
      <p><strong>Personality Traits:</strong> {personality_traits}</p>

      <button
        className="take-quiz-again-button"
        onClick={() => window.location.reload()}
      >
        Take Quiz Again
      </button>
    </div>
  );
};

export default Result;
