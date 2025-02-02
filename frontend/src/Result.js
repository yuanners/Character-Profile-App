import React from 'react';

const Result = ({ characterData }) => {
  if (!characterData || !characterData.character) {
    return <div>Loading...</div>;
  }

  const rawText = characterData.character;

  
  const nameMatch = rawText.match(/\*\*(.*?)\*\*/); 
  const ageMatch = rawText.match(/Age:\s*(\d+)/);
  const hobbyMatch = rawText.match(/Hobbies:\s*(.*?)(?=\s*Personality Traits:|$)/);
  const traitsMatch = rawText.match(/Personality Traits:\s*(.*)/);

  const name = nameMatch ? nameMatch[1] : "Unknown Character";
  const age = ageMatch ? ageMatch[1] : "Unknown Age";
  const hobbies = hobbyMatch ? hobbyMatch[1] : "Unknown Hobbies";
  const traits = traitsMatch ? traitsMatch[1] : "No personality traits found.";

  return (
    <div className="result-container">
      <h2>You are {name}!</h2>
      <p><strong>Age:</strong> {age}</p>
      <p><strong>Hobbies:</strong> {hobbies}</p>
      <p><strong>Personality Traits:</strong> {traits}</p>
    </div>
  );
};

export default Result;
