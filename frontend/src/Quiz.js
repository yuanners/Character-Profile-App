import React, { useState } from 'react';
import './Quiz.css';
import Result from './Result';

const questions = [
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
  },
  {
    question: "What's your ideal type?",
    options: ["Intelligent and logical", "Kind and empathetic", "Confident and assertive", "Funny and easygoing"]
  },
];

const Quiz = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null); // Store the selected option
  const [loading, setLoading] = useState(false); // To control the loader display
  const [characterResult, setCharacterResult] = useState(null); // Store the final character result
  
  const handleAnswerSelection = (answer, index) => {
    setAnswers([...answers, answer]);
    setSelectedOption(index); // Set selected option to the clicked index

    // Move to the next question after selecting an answer
    if (currentQuestionIndex < questions.length - 1) {
      setTimeout(() => {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setSelectedOption(null); // Reset selected option for the next question
      }, 300); // Small delay for UX smoothness
    } else {
      // Once the last question is answered, submit answers
      handleSubmit();
    }
  };

  const handleSubmit = async () => {
    setLoading(true); // Start the loader when the result is being fetched

    const response = await fetch('http://127.0.0.1:5000/generate-character', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ answers })
    });

    const result = await response.json();
    setCharacterResult(result);  // Store the result in the state
    setTimeout(()=>{
        setLoading(false);
    }, 20000);
  };

  if (characterResult) {
    // If the result is available, show the Result component
    return <Result characterData={characterResult} />;
  }

  return (
    <div className="quiz-container">
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

      {loading && <div className="loader">Loading...</div>}
    </div>
  );
};

export default Quiz;
