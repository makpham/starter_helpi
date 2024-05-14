import { Button, Form } from 'react-bootstrap';
import { useState } from 'react';
import "./DetailedQuestions.css";
import LoadingBar from 'react-top-loading-bar';
import CherryBlossom from './CherryBlossom';
import { useNavigate } from 'react-router-dom';

function DetailedQuestions({ results, setResults }: { results: string, setResults: React.Dispatch<React.SetStateAction<string>> }) {
  const questions = [
    {
      question:
        "1. How have your career aspirations evolved over the last five years, and what factors have influenced these changes?",
    },
    {
      question:
        "2. Can you discuss a strategic decision you made in your career, and the impact it had on your professional journey?",
    },
    {
      question:
        "3. Reflecting on your career to date, what would you consider your most significant accomplishment and why?",
    },
    {
      question:
        "4. What specific skills or knowledge do you believe you need to acquire to advance in your current career path?",
    },
    {
      question:
        "5. How do you evaluate the culture of a workplace, and how important is cultural fit for you when considering a new position?",
    },
    {
      question:
        "6. Discuss how you approach networking within your industry and the value it has brought to your professional life.",
    },
    {
      question:
        "7. What long-term career goals do you have, and what steps are you taking to achieve them?",
    },
  ];

  const navigate = useNavigate();
  const setPage = (path: string) => {
    navigate(path);
  };
  const [progress, setProgress] = useState<number>(0)

  return <div id='detailed-body'>
  <Button id='menu-bar' onClick={() => setPage("/choices")}>&lt;</Button>
    
  <LoadingBar
    color="#9DB4C0"
    height={10}
    progress={progress}
    onLoaderFinished={() => setProgress(99.99)}
  />
  <CherryBlossom />
  <h1>Detailed Questionaire</h1>
  <Form>
    {questions.map((question: {question: string}, question_index) =>{
      return <div className='question' key={question_index}>
        <Form.Label >{question['question']}</Form.Label>
        <Form.Control
          type="text"
          className='form-textbox'
        />
      </div>
    })}
    <Button disabled={progress !== 99.99}>Submit</Button>
  </Form>
</div>
}

export default DetailedQuestions;
