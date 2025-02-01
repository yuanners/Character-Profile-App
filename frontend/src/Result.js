import React from 'react';

const Result = ({ characterData }) => {
  if (!characterData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="result-container">
      <h2>You are {characterData.name}!</h2>
      <p><strong>Age:</strong> {characterData.age}</p>
      <p><strong>Hobby:</strong> {characterData.hobby}</p>
      <p><strong>Personality Traits:</strong> {characterData.traits}</p>
    </div>
  );
};

export default Result;
