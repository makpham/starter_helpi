import React, { useState } from "react";
import { FormControl, ProgressBar } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import "./DetailedQuestions.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import OpenAI from "openai";
import backgroundImg from "../imgs/background.jpg";

function DetailedQuestions({ results, setResults }: { results: string, setResults: React.Dispatch<React.SetStateAction<string>> }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [isLastQuestionAnswered, setIsLastQuestionAnswered] = useState(false);
  const [currentGPTAnswer, setGPTAnswer] = useState(0);
  const [answers, setAnswers] = useState(Array(7).fill(""));
  const navigate = useNavigate();
  //const [maxPercentage, setMaxPercentage] = useState(100);
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

  const call_gpt = async (question: string, choice: string) => {
    try {
      const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content:
              "You are a job discovery assistant, you are given a question and an answer as well as the format and current values of the potential fields list in JSON format, update the JSON so that it has exactly 5 fields of 'goal oriented' 'attention to detail' teamwork' 'innovative' 'problem solving', return purely the JSON object string remove markdowns and any comments the user only wants the JSON string, make sure the percentages add up to exactly 100. JSON is in the format {jobs: [name: name, percentage_match: percentage]}",
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

  const progress =
    ((currentQuestion + (isLastQuestionAnswered ? 1 : 0)) / questions.length) *
    100;

  const handleNext = async () => {
    if (currentQuestion < questions.length - 1) {
      if (!answers[currentQuestion]) {
        alert("Please answer the question before moving on.");
        return;
      }
      let gpt_call = await call_gpt(
        questions[currentQuestion]["question"],
        answers[currentQuestion]
      );
      setResults(gpt_call !== null ? gpt_call : "");
      if(gpt_call !== null){
        let parsedGptCall
        try{
          parsedGptCall = JSON.parse(gpt_call);
        }catch(error){
          console.log("JSON error from gpt");
          handleNext();
          return;
        }
        if(parsedGptCall["error"] === "Invalid key"){
          alert("please eneter valid key")
          return;
        }else{
          setGptAnswer([...gpt_answer, parsedGptCall]); 
          setGPTAnswer(currentGPTAnswer + 1);
          const newAnswers = [...answers];
          newAnswers[currentQuestion] = answers[currentQuestion];
          setAnswers(newAnswers);
          console.log("test");
          setCurrentQuestion(currentQuestion + 1);
        }
      }
    } else if (
      currentQuestion === questions.length - 1 &&
      isLastQuestionAnswered
    ) {
    navigate(`/results/`);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      if (currentGPTAnswer > 0) {
        setGptAnswer([...gpt_answer.slice(0, gpt_answer.length - 1)]);
        setGPTAnswer(currentGPTAnswer - 1);
      }
    }
  };

  const handleAnswerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = e.target.value;
    setAnswers(newAnswers);
    if (currentQuestion === questions.length - 1) {
      setIsLastQuestionAnswered(e.target.value !== "");
    }
  };

  return (
    <div>
      <Header />
    <div style={{ alignItems: "center" }}>
      <div style={{ backgroundImage: `url(${backgroundImg})`}}>
        <div
          style={{
            animationName: "bounce",
            animationDuration: "2s",
            padding: "2em 0 6em",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 20px",
              width: "80%",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                width: "100%",
                justifyContent: "space-between",
              }}
            >
              <div className="progress-bar-container-detailed">
              <ProgressBar
                  now={progress}
                  striped
                  variant="info"
                  style={{ flex: 1, borderRadius: "10px", overflow: "hidden", border: '3px solid black' }}
                >
                <div
                  className="progress-bar-fill-detailed"
                  style={{ width: `${progress}%` }}
                ></div>
                <div
                  className="progress-bar-circle-detailed"
                  style={{ left: `calc(${progress}% - 15px)` }}
                >
                  <div className="icon-check-detailed">
                    {isLastQuestionAnswered &&
                    currentQuestion === questions.length - 1
                      ? "100%"
                      : `${progress.toFixed(0)}%`}
                  </div>
                </div>
                </ProgressBar>
              </div>
            </div>
          </div>
          <div
            style={{
              width: "80%",
              margin: "0 auto",
              border: "5px solid #333",
              borderRadius: "10px",
              backgroundColor: "#0c416a",
              paddingTop: "1em"
            }}
          >
            {questions.map((question, index) => (
              <div
                key={index}
                style={{
                  display: index === currentQuestion ? "block" : "none",
                  textAlign: "center",
                  width: "85%",
                  margin: "0 auto",
                  color: "white",
                  fontWeight: "bold",
                  paddingTop: "2em",
                }}
              >
                <p style={{ marginBottom: "20px", paddingBottom: "2em" }}>{question.question}</p>
                <center>
                  <FormControl
                    as="textarea"
                    value={answers[index]}
                    onChange={handleAnswerChange}
                    style={{ marginBottom: "20px", maxWidth: "75%", paddingBottom: "2em" }}
                  />
                </center>
                <div style={{ display: "flex", justifyContent: "center", marginBottom: "2em" }}>
                  <div
                    onClick={handlePrevious}
                    className="button-div"
                    style={{ backgroundColor: "antiquewhite" }}
                  >
                    Previous
                  </div>
                  <div
                    onClick={handleNext}
                    className="button-div"
                    style={{ backgroundColor: "antiquewhite" }}
                  >
                    {currentQuestion === questions.length - 1 &&
                    isLastQuestionAnswered
                      ? "Get Results"
                      : "Next"}
                  </div>
                </div>
              </div>
            ))}
            {gpt_answer.map(
                  (
                    answer: {
                      jobs: { name: string; percentage_match: number }[];
                    },
                    index: number
                  ) => (
              <div
                key={index}
                style={{
                  display: index === currentGPTAnswer ? "block" : "none",
                  textAlign: "center",
                }}
              >
                {answer.jobs.map(
                        (
                          job_name: { name: string; percentage_match: number },
                          test: number
                        ) => (
                          <ProgressBar
                            striped
                            variant="success"
                            now={job_name.percentage_match}
                            label={job_name.name}
                            key={test}
                            //max={maxPercentage} // will implement this later
                          />
                        )
                      )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
      <Footer />
    </div>
  );
}

export default DetailedQuestions;
