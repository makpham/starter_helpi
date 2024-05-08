import React, { useState } from "react";
import { ProgressBar } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import OpenAI from "openai";
import "./BasicQuestions.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ResultsPage from "./ResultsPage";
// update

function BasicQuestions() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [currentGPTAnswer, setGPTAnswer] = useState(0);
  const [isLastQuestionAnswered, setIsLastQuestionAnswered] = useState(false);
  const [maxPercentage, setMaxPercentage] = useState(100);
  const navigate = useNavigate();
  const setPage = (path: string) => {
    navigate(path);
  };

  // Add a new state variable for the loading state
  const [isLoading, setIsLoading] = useState(false);
  
  // Add a new state variable for the blur state
  const [isBlurred, setIsBlurred] = useState(false);

  const [gpt_answer, setGptAnswer] = useState([
    {
      jobs: [
        {
          name: "sample name",
          percentage_match: 0,
        },
      ],
    },
  ]);

  const openai = new OpenAI({
    apiKey: JSON.parse(localStorage.getItem("MYKEY") || ""),
    dangerouslyAllowBrowser: true,
  });
  
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

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [currentGPTAnswer, setGPTAnswer] = useState(0);
  const [isLastQuestionAnswered, setIsLastQuestionAnswered] = useState(false);
  const [maxPercentage, setMaxPercentage] = useState(100);

  // Add a new state variable for the loading state
  const [isLoading, setIsLoading] = useState(false);
  
  // Add a new state variable for the blur state
  const [isBlurred, setIsBlurred] = useState(false);

  interface Trait {
    name: string;
    percentage_match: number;
  }
  
  interface GptAnswer {
    traits: Trait[];
  }

  const initialTraits = [
    { name: "action oriented", percentage_match: 0 },
    { name: "teamwork", percentage_match: 0 },
    { name: "influence", percentage_match: 0 },
    { name: "problem solving", percentage_match: 0 },
    { name: "innovation", percentage_match: 0 },
  ];
  
  const [gpt_answer, setGptAnswer] = useState<GptAnswer[]>([
    {
      traits: initialTraits,
    },
  ]);

  const openai = new OpenAI({
    apiKey: JSON.parse(localStorage.getItem("MYKEY") || ""),
    dangerouslyAllowBrowser: true,
  });

  const findMax = (x: {
    traits: { name: string; percentage_match: number }[];
  }) => {
    let max: number = 0;
    x.traits.forEach( (element:{ name: string; percentage_match: number }) => {
      if (element.percentage_match > max) max = element.percentage_match;
    })
    return max;
  };

  const progress =
    ((currentQuestion + (isLastQuestionAnswered ? 1 : 0)) / questions.length) *
    100;

  const handlePrevious = () => {
    //Mayybe delete lines 95 and 96 for a fix - will ask teammate
    if (isLastQuestionAnswered) {
      setIsLastQuestionAnswered(false);
    } else if (currentQuestion > 0) {
      if (currentGPTAnswer > 0) {
        console.log(gpt_answer);
        console.log(maxPercentage);
        setMaxPercentage(findMax(gpt_answer[gpt_answer.length-1]))
        console.log(gpt_answer);
        console.log(maxPercentage);
        setGptAnswer([...gpt_answer.slice(0, gpt_answer.length - 1)]);
        setGPTAnswer(currentGPTAnswer - 1);
      }
      setCurrentQuestion(currentQuestion - 1);
    }
  };
  const call_gpt = async (question: string, choice: string) => {
    try {
      const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content:
            "You are a job discovery assistant, you are given a question and an answer as well as the format and current values of the potential traits list in JSON format, update the JSON so that it has exactly 5 traits, return purely the JSON object string remove markdowns and any comments the user only wants the JSON string, make sure the percentages add up to exactly 100 and the traits are kept the same after each question is answered. JSON is in the format {traits: [name: name, percentage_match: percentage]} with the traits remaining as 'attention to detail' 'goal oriented' 'innovative' 'teamwork' 'problem solving'",
          },
          {
            role: "user",
            content:
              "Question: " +
              question +
              " | Answer: " +
              choice +
              " | current values: " +
              gpt_answer[currentGPTAnswer],
          },
        ],
        temperature: 0.7,
        n: 1,
      });
      return response.choices[0].message.content;
    } catch (error) {
      return "{\"error\": \"Invalid key\"}"
    }
  };

  const handleAnswer = async (choice_index: number) => {
    const question_answered = questions[currentQuestion]["question"];
    const answer = questions[currentQuestion]["choices"][choice_index];

    // Set loading state to true when user selects an answer
    setIsLoading(true);
    // Set blur state to true when update starts
    setIsBlurred(true);


    let gpt_call = await call_gpt(question_answered, answer);

    if(gpt_call !== null){
      let parsedGptCall
      try{
        parsedGptCall = JSON.parse(gpt_call);
      }catch(error){
        console.log("JSON error from gpt");
        handleAnswer(choice_index);
        return;
      }
      if(parsedGptCall["error"] === "Invalid key"){
        alert("please eneter valid key")
        return;
      }else{
      setGptAnswer([...gpt_answer, parsedGptCall]);
      setGPTAnswer(currentGPTAnswer + 1);
      setMaxPercentage(findMax(gpt_answer[currentGPTAnswer]));
      }
    }
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setIsLastQuestionAnswered(true);
      
    }
    // Set loading state to false after response is processed
    setIsLoading(false);

    // Set blur state to false after update is processed
    setIsBlurred(false)
    
  };
  const finalAnswer = isLastQuestionAnswered ? (
    <button onClick={() => setPage("results-page")}>Get Results</button>
  ) : null;

  

  return (

/* TASKS:
    -find out where the progress bar went and put it back

    -fix the routing to results-page, as of not its basic-question/results

    -center everything

    -add some nice effects

    -change the get result button so it matches the other button
  */

    <div className="center-align">
    <Header />
    <div className="bg-color">
      <br />
      <br />
      <div className="bounce-animation">
        <div className="flex-center">
          <div className="flex-space-between">
            <div className="progress-bar-container">
              <ProgressBar now={progress} striped variant="info">
                <div className="progress-bar-fill"></div>
                <div className="progress-bar-circle">
                  <div className="icon-check">
                    {isLastQuestionAnswered &&
                    currentQuestion === questions.length - 1
                      ? "100%"
                      : `${progress.toFixed(0)}%`}
                    </div>
                  </div>
                </div>
              </ProgressBar>
            </div>
          </div>
        </div>
          <br />
          <br />
          <div
            style={{
              width: "80%",
              margin: "0 auto",
              border: "5px solid #FFA254",
              borderRadius: "10px",
              backgroundColor: "#62A0D1"
            }}
          >
            <br />
            <br />
            {questions.map((question, index) => (
              <div
                key={index}
                style={{
                  display: index === currentQuestion ? "block" : "none",
                  textAlign: "center",
                  width: "85%",
                  margin: "0 auto",
                  color: "white",
                  fontWeight: "bold"
                }}
              >
                <p style={{ marginBottom: "20px" }}>{question.question}</p>
                <br />
                <center className="button-row" style={{border: "2px solid white", padding: "10px", display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between'}}>
                  {question.choices.map((choice, i) => (
                    <div
                      key={i}
                      onClick={() => handleAnswer(i)}
                      className="button-div"
                      style={{flex: '0 0 48%'}}
                    >
                      {choice}
                    </div>
                  ))}
                </center>
                <br />
                <div style={{ display: "flex", justifyContent: "center" }}>
                  {index !== 0 && (
                    <div
                      onClick={handlePrevious}
                      className="button-div"
                      style={{
                        backgroundColor: "antiquewhite",
                      }}
                    >
                      Previous
                    </div>
                  )}

                  {finalAnswer}
                </div>

                <br />
              <div style={{ position: 'relative' }}>
                {isLoading && (
                  <div style={{
                    position: 'relative',
                    top: (currentQuestion >= 2) ? 20 : 0,
                    zIndex: 2,
                    color: "black",
                  }}
                  className={isLoading ? "fade-in" : "fade-out"}
                  >
                    <div
                      className={`blur-effect`}
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        animation: isBlurred ? "blur-in .3s forwards" : "blur-out .3s forwards",
                      }}
                    >
                      Realtime results loading...
                    </div>
                  </div>
                  )}
                  {gpt_answer.map((answer: GptAnswer, index: number) => (
                    <div
                      key={index}
                      style={{
                        display: index === currentGPTAnswer ? "block" : "none",
                        textAlign: "center",
                      }}
                    >
                      {answer.traits.map((trait: Trait, test: number) => (
                        <div style={{ position: "relative" }}>
                          <ProgressBar
                            striped
                            variant="success"
                            now={trait.percentage_match}
                            label={trait.name}
                            key={test}
                                //max={maxPercentage} // will implement this later
                              />
                              <div
                                className={`blur-effect`}
                                style={{
                                  position: "absolute",
                                  top: 0,
                                  left: 0,
                                  width: "100%",
                                  height: "100%",
                                  animation: isBlurred ? "blur-in .3s forwards" : "blur-out .3s forwards",
                                }}
                              ></div>
                            </div>
                          )
                        )}
                      </div>
                    )
                  )}
                </div>
              </div>
            ))}
            <br />
            <br />
            <br />
          </div>
          <br />
          <br />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default BasicQuestions;
