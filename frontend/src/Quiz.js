import React, { useState } from 'react';
import './Quiz.css';
import Result from './Result';

const questions = [
    {
        question: "What's your gender?",
        options: ["Female", "Male"]
    },
    {
        question: "What's your ideal first date?",
        options: ["A fun beach day", "A romantic dinner", "An adventurous hiking trip", "A relaxing day at home"]
    },
    {
        question: "How would your friends describe you?",
        options: ["Outgoing and fun", "Calm and thoughtful", "Adventurous and bold", "Shy and reserved"]
    },
    {
        question: "What's most important to you in a relationship?",
        options: ["Honesty", "Adventurous spirit", "Support and loyalty", "Fun and excitement"]
    }
];

const Quiz = ({ onGenerate, setShowQuiz }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null); 
  const [loading, setLoading] = useState(false); 
  const [characterResult, setCharacterResult] = useState(null); 
  
  const handleAnswerSelection = (answer, index) => {
    const currentQuestion = questions[currentQuestionIndex];
    setAnswers([...answers, { question: currentQuestion.question, answer }]);
    setSelectedOption(index);

    if (currentQuestionIndex < questions.length - 1) {
      setTimeout(() => {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setSelectedOption(null); 
      }, 300); 
    } else {
      handleSubmit();
    }
  };

  const handleSubmit = async () => {
    setLoading(true); 

    const response = await fetch('https://character-profile-app-backend.vercel.app/generate-character', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ answers })
    });

    const result = await response.json();
    setCharacterResult(result); 
    setTimeout(()=>{
        setLoading(false);
    }, 3000); 
  };

  if (characterResult) {
    return <Result characterData={characterResult} />;
  }

  return (
    <div className="quiz-container">
      {loading ? (
        <div className="loader"></div> 
      ) : (
        <>
          <h2>{questions[currentQuestionIndex].question}</h2>

          <div className="options-container">
            {questions[currentQuestionIndex].options.map((option, index) => (
              <button
                key={index}
                className={`option-button ${selectedOption === index ? 'selected' : ''}`}
                onClick={() => handleAnswerSelection(option, index)}
              >
                {option}
              </button>
            ))}
          </div>

          <button 
            className="view-profiles-button" 
            onClick={() => setShowQuiz(false)} 
          >
            View Saved Profiles
          </button>
        </>
      )}
    </div>
  );
};

export default Quiz;
