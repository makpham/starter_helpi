import { Button, Form } from 'react-bootstrap';
import { useState } from 'react';
import "./DetailedQuestions.css";
import LoadingBar from 'react-top-loading-bar';
import CherryBlossom from './CherryBlossom';
import { useNavigate } from 'react-router-dom';
import Typewriter from 'typewriter-effect';
import ConfettiExplosion from 'react-confetti-explosion';


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
  const [answers, setAnswers] = useState<string[]>(["","","","","","","",]);
  const [progress, setProgress] = useState<number>(0)

  function updateProgress(answerList: string[]){
    let numAnswers = 0;
    answerList.forEach((value: String, index: number, array: String[]) => {
      if(value !== ""){
        numAnswers += 1;
      } 
    } );
    console.log(progress)
    setProgress((numAnswers/questions.length) * 100)
  }
  function updateAnswers(answer: string, question_index: number){
    setAnswers([...answers.slice(0,question_index), answer, ...answers.slice(question_index + 1)]);
    updateProgress([...answers.slice(0,question_index), answer, ...answers.slice(question_index + 1)]);
  }

  return <div id='detailed-body'>

{(progress === 99.99) && <ConfettiExplosion height={"200vh"} particleCount={200} duration={2000}/>}

  <header><Button id='menu-bar' onClick={() => setPage("/choices")}>&lt;</Button>
  <Button className="Merienda" id='change-type' onClick={() => setPage("/basic-questions")} title='Do basic questionaire instead'>Basic Questionaire</Button>
  
  </header>
    
  <LoadingBar
    color="#9DB4C0"
    height={10}
    progress={progress}
    onLoaderFinished={() => setProgress(99.99)}
  />
  <CherryBlossom />
  <h1>
            <Typewriter
                options={{
                    delay: 50
                }}
                onInit={(typewriter) => {
                    typewriter.typeString('Detailed Questionaire')
                        .start();
                }}
            />
        </h1>
  <Form>
    {questions.map((question: {question: string}, question_index) =>{
      return <div className='question' key={question_index}>
        <Form.Label >{question['question']}</Form.Label>
        <Form.Control
          onChange={(event) => {
            updateAnswers(event.target.value, question_index)
          }}
          type="text"
          className='form-textbox'
        />
      </div>
    })}
    <Button disabled={progress !== 99.99} onClick={() => { navigate("/results", {state: answers});}}>Submit</Button>
  </Form>
</div>
}

export default DetailedQuestions;
