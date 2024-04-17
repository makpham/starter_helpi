import React, { useState } from 'react';
import { ProgressBar, Button, FormControl } from 'react-bootstrap';

function DetailedQuestions() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState(Array(7).fill(''));

  const questions=[
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

  const progress = ((currentQuestion) / questions.length) * 100;

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      const newAnswers = [...answers];
      newAnswers[currentQuestion] = answers[currentQuestion];
      setAnswers(newAnswers);
      setCurrentQuestion(currentQuestion + 1);
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
  };

  return (
    <div>
      <h1>Detailed Questions</h1>
      <br />
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px', width: '80%', margin: '0 auto'}}>
        <div style={{ display: 'flex', alignItems: 'center', width: '100%', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', border: '1px solid black', borderRadius: '5px', overflow: 'hidden', flex: 1 }}>
            <ProgressBar striped animated={progress < 100} now={progress} variant={progress === 100 ? 'success' : 'primary'} style={{ width: '100%' }} />
          </div>
          <span style={{ marginLeft: '10px'}}>{progress.toFixed(0)}%</span>
        </div>
      </div>
      <br />
      {currentQuestion === questions.length && (
        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          <p>Thank you for your responses, click the "Get Results" button to get your outcome
            <br /> <b> OR </b> <br /> Click previous to change a response.</p>
          <Button onClick={handlePrevious} style={{margin: '5px'}}>Previous</Button>
          <Button onClick={() => console.log('Get results')} style={{ whiteSpace: 'nowrap', margin: '5px' }}>Get results</Button>
        </div>
      )}
      {questions.map((question, index) => (
        <div key={index} style={{ display: index === currentQuestion ? 'block' : 'none', textAlign: 'center'}}>
          <p style={{ marginBottom: '20px' }}>{question.question}</p>
          <center><FormControl
            as="textarea"
            value={answers[index]}
            onChange={handleAnswerChange}
            style={{marginBottom: '20px', maxWidth: '800px'}}
          />
          </center>
          <Button onClick={handlePrevious} disabled={index === 0} style={{margin: '5px', marginBottom: '20px'}}>Previous</Button>
          <Button onClick={handleNext} style={{margin: '5px', marginBottom: '20px'}}>
            {index === questions.length - 1 ? 'Finish' : 'Next'} </Button>
        </div>
      ))}
    </div>
  );
}

export default DetailedQuestions;