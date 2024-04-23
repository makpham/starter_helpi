import React, { useState } from 'react';
import { FormControl } from 'react-bootstrap';
import './DetailedQuestions.css'

function DetailedQuestions() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState(Array(7).fill(''));
  const [isLastQuestionAnswered, setIsLastQuestionAnswered] = useState(false);

  const questions = [
    {
      question: "1. How have your career aspirations evolved over the last five years, and what factors have influenced these changes?",
    },
    {
      question: "2. Can you discuss a strategic decision you made in your career, and the impact it had on your professional journey?",
    },
    {
      question: "3. Reflecting on your career to date, what would you consider your most significant accomplishment and why?",
    },
    {
      question: "4. What specific skills or knowledge do you believe you need to acquire to advance in your current career path?",
    },
    {
      question: "5. How do you evaluate the culture of a workplace, and how important is cultural fit for you when considering a new position?",
    },
    {
      question: "6. Discuss how you approach networking within your industry and the value it has brought to your professional life.",
    },
    {
      question: "7. What long-term career goals do you have, and what steps are you taking to achieve them?",
    },
  ];

  const progress = ((currentQuestion + (isLastQuestionAnswered ? 1 : 0)) / questions.length) * 100;

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      if (!answers[currentQuestion]) {
        alert('Please answer the question before moving on.');
        return;
      }

      const newAnswers = [...answers];
      newAnswers[currentQuestion] = answers[currentQuestion];
      setAnswers(newAnswers);
      setCurrentQuestion(currentQuestion + 1);
    } else if (currentQuestion === questions.length - 1 && isLastQuestionAnswered) {
      // Handle the "Get Results" action here
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleAnswerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = e.target.value;
    setAnswers(newAnswers);

    if (currentQuestion === questions.length - 1) {
      setIsLastQuestionAnswered(e.target.value !== '');
    }
  };

  return (
    <body style={{ alignItems: 'center' }}>
    <div style={{ backgroundColor: '#FFC38A' }}>
      <br />
      <br />
      <div style={{
  animationName: 'bounce',
  animationDuration: '2s'
}}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px', width: '80%', margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', width: '100%', justifyContent: 'space-between' }}>
          <div className="progress-bar-container">
            <div className="progress-bar">
              <div className="progress-bar-fill" style={{ width: `${progress}%` }}></div>
            </div>
            <div className="progress-bar-circle" style={{ left: `calc(${progress}% - 15px)` }}>
              <div className="icon-check">
                {isLastQuestionAnswered && currentQuestion === questions.length - 1 ? '100%' : `${progress.toFixed(0)}%`}
              </div>
            </div>
          </div>
        </div>
      </div>
      <br />
      <br></br>
      <div style={{ width: '80%', margin: '0 auto', border: '5px solid #FFA254', borderRadius: '10px', backgroundColor: '#C3EEDF' }}>
        <br />
        <br />
        {questions.map((question, index) => (
          <div key={index} style={{ display: index === currentQuestion ? 'block' : 'none', textAlign: 'center', width: '85%' }}>
            <p style={{ marginBottom: '20px' }}>{question.question}</p>
            <br />
            <br />
            <center>
              <FormControl
                as="textarea"
                value={answers[index]}
                onChange={handleAnswerChange}
                style={{ marginBottom: '20px', maxWidth: '75%' }}
              />
              <br />
              <br />
            </center>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <div onClick={handlePrevious} className="button-div" style={{ backgroundColor: '#DEBFFD' }}>Previous</div>
              <div onClick={handleNext} className="button-div" style={{ backgroundColor: '#DEBFFD' }}>
                {currentQuestion === questions.length - 1 && isLastQuestionAnswered ? 'Get Results' : 'Next'}
              </div>
            </div>
            <br />
            <br />
          </div>
        ))}
      </div>
      <br />
      <br />
      <br />
      <br />
      <br />
      </div>
    </div>
    </body>
  );
}

export default DetailedQuestions;