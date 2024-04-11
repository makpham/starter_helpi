import React, { useState } from 'react';
import './Question.css'
import Question from './Question';

function BasicQuestions() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [isLastQuestionAnswered, setIsLastQuestionAnswered] = useState(false);
  const questions = [
    {
      question: "1. What are your top three professional strengths, and how have they influenced your career choices?",
      choices: ["Choice 1", "Choice 2", "Choice 3", "Choice 4"]
    },
    {
      question: "2. Describe a time when you overcame a significant challenge at work. What did you learn from that experience?",
      choices: ["Choice 1", "Choice 2", "Choice 3", "Choice 4"]
    },
    {
      question: "3. How do you prioritize your tasks and manage time when facing tight deadlines?",
      choices: ["Choice 1", "Choice 2", "Choice 3", "Choice 4"]
    },
    {
      question: "4. Other than financial incentives, what motivates you to perform well in your job?",
      choices: ["Choice 1", "Choice 2", "Choice 3", "Choice 4"]
    },
    {
      question: "5. Can you give an example of how you have continued to learn and grow professionally in the past year?",
      choices: ["Choice 1", "Choice 2", "Choice 3", "Choice 4"]
    },
    {
      question: "6. How do you balance teamwork with individual responsibility in a work environment?",
      choices: ["Choice 1", "Choice 2", "Choice 3", "Choice 4"]
    },
    {
      question: "7. What type of work environment do you succeed in, and why?",
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