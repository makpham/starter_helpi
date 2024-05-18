import { Button, Form } from 'react-bootstrap';
import { useState } from 'react';
import "./BasicQuestions.css";
import LoadingBar from 'react-top-loading-bar';
import CherryBlossom from '../components/CherryBlossom';
import Typewriter from 'typewriter-effect';
import { useNavigate } from 'react-router-dom';
import ConfettiExplosion from 'react-confetti-explosion';
import RedirectModal from '../components/RedirectModal';


function BasicQuestions({ results, setResults }: { results: string, setResults: React.Dispatch<React.SetStateAction<string>> }) {
  const questions = [
    {
      question:
        "1. What best describes your approach to problem-solving at work?",
      choices: [
        "I analyze the problem and consider multiple solutions.",
        "I rely on proven methods and consult with colleagues.",
        "I prefer a creative approach to find innovative solutions.",
        "I tackle problems as they arise without prior planning.",
      ],
    },
    {
      question: "2. How do you handle stress in the workplace?",
      choices: [
        "I prioritize my tasks and take breaks when necessary.",
        "I seek support from my peers or supervisors.",
        "I maintain a calm perspective and focus on solutions.",
        "I usually feel overwhelmed and struggle to cope.",
      ],
    },
    {
      question: "3. Which work setting do you prefer?",
      choices: [
        "A quiet, independent office environment.",
        "A dynamic, team-oriented workspace.",
        "A flexible and remote work setting.",
        "A structured and highly organized office.",
      ],
    },
    {
      question: "4. What motivates you to achieve your best work?",
      choices: [
        "Achieving personal goals and self-improvement.",
        "Receiving recognition and rewards for my efforts.",
        "Contributing to team success and collaborative achievements.",
        "Meeting deadlines and efficiency metrics.",
      ],
    },
    {
      question: "5. How do you prioritize your tasks?",
      choices: [
        "I handle tasks as they come, without specific prioritization.",
        "I plan my tasks based on deadlines.",
        "I prioritize tasks based on their importance and urgency.",
        "I delegate tasks to manage my workload effectively.",
      ],
    },
    {
      question: "6. How do you prefer to receive feedback?",
      choices: [
        "In formal reviews with documentation.",
        "Through informal daily or weekly updates.",
        "Via peer feedback and team discussions.",
        "I prefer not to receive feedback frequently.",
      ],
    },
    {
      question: "7. What type of leadership style do you thrive under?",
      choices: [
        "Directive leadership with clear instructions.",
        "Supportive leadership that fosters personal growth.",
        "Autonomous leadership that trusts in my decision-making.",
        "Collaborative leadership with shared responsibilities.",
      ],
    },
  ];
  
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [nextPage, setNextPage] = useState("");
  const [answers, setAnswers] = useState<string[]>(["","","","","","","",]);
  const [progress, setProgress] = useState<number>(0)

  // Function to set the next page based on the provided path
  // If there are any non-empty answers, it sets the next page and shows a modal
  // Otherwise, it navigates to the next page directly
  const setPage = (path: string) => {
      if (answers.some(answer => answer !== "")) {
        setNextPage(path);
        setShowModal(true);
      }
      else {
        navigate(path);
      }
  };

  // Function to handle the confirmation of the modal
  // It navigates to the next page and passes the answers as state
  // Then it hides the modal
  const handleConfirm = () => {
      navigate(nextPage, {state: answers});
      setShowModal(false);
  };

  // Function to handle the cancellation of the modal
  // It simply hides the modal
  const handleCancel = () => {
      setShowModal(false);
  };

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
  return <div id='basic-body'>
  {(progress === 99.99) && <ConfettiExplosion height={"200vh"} particleCount={200} duration={2000}/>}

    <header>
      
      <Button id='menu-bar-choices' className="Merienda" onClick={() => setPage("/choices")}>&lt;</Button>
      <Button className="Merienda" id='change-type' onClick={() => setPage("/detailed-questions")} title='Do detailed questionaire instead'>Detailed Questions</Button>
    
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
                    typewriter.typeString('Basic Questionaire')
                        .start();
                }}
            />
        </h1>
    <RedirectModal show={showModal} handleCancel={handleCancel} handleConfirm={handleConfirm} />
    <Form>
      {questions.map((question: {question: string, choices: string[]}, question_index) =>{
        return <div className='question' key={question_index}>
          <Form.Label >{question['question']}</Form.Label>
          {question['choices'].map( (answer: string, answer_index) => {
            return <Form.Check
            type="radio"
            key={answer_index}
            onClick={()=>{updateAnswers(answer, question_index)}}
            name={question['question']}
            label={answer}
            className='options'
          />;
          })}
        </div>
      })}
      <Button disabled={progress !== 99.99} onClick={() =>{
        navigate("/results", {state: answers});
      }}>Submit</Button>
    </Form>
  </div>
}

export default BasicQuestions;
