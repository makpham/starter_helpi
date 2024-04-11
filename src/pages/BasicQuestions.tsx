import React, { useState } from 'react';
import './Question.css'
import Question from './Question';

function BasicQuestions() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [isLastQuestionAnswered, setIsLastQuestionAnswered] = useState(false);
  const questions = [
    {
      question: "Question 1?",
      choices: ["Choice 1", "Choice 2", "Choice 3", "Choice 4"]
    },
    {
      question: "Question 2?",
      choices: ["Choice 1", "Choice 2", "Choice 3", "Choice 4"]
    },
    {
      question: "Question 3?",
      choices: ["Choice 1", "Choice 2", "Choice 3", "Choice 4"]
    },
    {
      question: "Question 4?",
      choices: ["Choice 1", "Choice 2", "Choice 3", "Choice 4"]
    },
    {
      question: "Question 5?",
      choices: ["Choice 1", "Choice 2", "Choice 3", "Choice 4"]
    },
    {
      question: "Question 6?",
      choices: ["Choice 1", "Choice 2", "Choice 3", "Choice 4"]
    },
    {
      question: "Question 7?",
      choices: ["Choice 1", "Choice 2", "Choice 3", "Choice 4"]
    },
  ];

  const handleChoiceSelected = (choice: any) => {
    console.log(`You selected: ${choice}`);
    // handle the selected choice here
    if (currentQuestion === questions.length - 1) {
      setIsLastQuestionAnswered(true);
    } else {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handleGetResult = () => {
    console.log('Get the result');
    // handle getting the result here
  };

  return (
    <div>
      <header>
        <h1>Basic Questions</h1>
      </header>
      <body>
      <div className="question-container">
  <Question
    question={questions[currentQuestion].question}
    choices={questions[currentQuestion].choices}
    onChoiceSelected={handleChoiceSelected}
  />
  <div className="result-button">
    {isLastQuestionAnswered && (
      <button onClick={handleGetResult}>Get Result</button>
    )}
  </div>
</div>
      </body>
    </div>
  );
}

export default BasicQuestions;