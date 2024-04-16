import React, { useState } from 'react';
import { ProgressBar, Button } from 'react-bootstrap';

function BasicQuestions() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [isLastQuestionAnswered, setIsLastQuestionAnswered] = useState(false);

  const questions=[
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

  const handleAnswer = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setIsLastQuestionAnswered(true);
    }
  };


  const progress = ((currentQuestion + (isLastQuestionAnswered ? 1 : 0)) / questions.length) * 100;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: '5vh', position: 'relative'}}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px', width: '80%', margin: '0 auto'}}>
        <div style={{ display: 'flex', alignItems: 'center', width: '100%', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', border: '1px solid black', borderRadius: '5px', overflow: 'hidden', flex: 1 }}>
            <ProgressBar striped animated={progress < 100} now={progress} variant={progress === 100 ? 'success' : 'primary'} style={{ width: '100%' }} />
          </div>
          <span style={{ marginLeft: '10px' }}>{progress.toFixed(0)}%</span>
          {isLastQuestionAnswered && (
            <div style={{ marginLeft: '10px'}}>
              <Button onClick={() => console.log('Get results')} style={{ whiteSpace: 'nowrap' }}>Get results</Button>
            </div>
          )}
        </div>
      </div>
      <br></br>
      {questions.map((question, index) => (
        <div key={index} style={{ display: index === currentQuestion ? 'block' : 'none', textAlign: 'center'}}>
          <p style={{ marginBottom: '20px' }}>{question.question}</p>
          {question.choices.map((choice, i) => (
            <Button key={i} onClick={handleAnswer} style={{margin: '5px' }}>{choice}</Button>
          ))}
        </div>
      ))}
      <br></br>
    </div>
  );

}


export default BasicQuestions;