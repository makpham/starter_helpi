import React, { useState } from "react";
import { Button, ProgressBar } from "react-bootstrap";
import OpenAI from "openai";
import "./BasicQuestions.css";
import Header from "../components/Header"
import Footer from "../components/Footer";

function BasicQuestions() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [currentGPTAnswer, setGPTAnswer] = useState(0);
  const [isLastQuestionAnswered, setIsLastQuestionAnswered] = useState(false);
  const [maxPercentage, setMaxPercentage] = useState(100);
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

  const findMax = (x: {
    jobs: { name: string; percentage_match: number }[];
  }) => {
    let max: number = 0;
    x.jobs.forEach( (element:{ name: string; percentage_match: number }) => {
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
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content:
              "You are a job discovery assistant, you are given a question and an answer as well as the format and current values of the potential fields list in JSON format, update the JSON so that it has exactly 5 fields, return purely the JSON object string remove markdowns and any comments the user only wants the JSON string, make sure the percentages add up to exactly 100. JSON is in the format {jobs: [name: name, percentage_match: percentage]}",
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
      console.error("Error fetching data:", error);
    }
  };

  const handleAnswer = async (choice_index: number) => {
    const question_answered = questions[currentQuestion]["question"];
    const answer = questions[currentQuestion]["choices"][choice_index];

    try {
      const gpt_call = await call_gpt(question_answered, answer);
      const parsedGptCall = JSON.parse(gpt_call || ""); // no I need it to error to retry again for pulling
      setGptAnswer([...gpt_answer, parsedGptCall]);
      setGPTAnswer(currentGPTAnswer + 1);
      setMaxPercentage(findMax(gpt_answer[currentGPTAnswer]));
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        setIsLastQuestionAnswered(true);
      }
    } catch (error) {
      console.error("Error handling the GPT call:", error);
      // Will fix this later but the loop is to ensure that the returned is actually formattable JSON
    }
  };

  return (
    <div>
    <Header />
    <div style={{ alignItems: "center" }}>
      <div style={{ backgroundColor: "#FFC38A" }}>
        <br />
        <br />
        <div
          style={{
            animationName: "bounce",
            animationDuration: "2s",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: "20px",
              width: "80%",
              margin: "0 auto",
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
              <div className="progress-bar-container">
                <ProgressBar
                  now={progress}
                  striped
                  variant="info"
                  style={{ flex: 1, borderRadius: "5px", overflow: "hidden" }}
                >
                  <div
                    className="progress-bar-fill"
                    style={{ width: `${progress}%` }}
                  ></div>
                  <div
                    className="progress-bar-circle"
                    style={{ left: `calc(${progress}% - 15px)` }}
                  >
                    <div className="icon-check">
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
          <br />
          <br />
          <div
            style={{
              width: "80%",
              margin: "0 auto",
              border: "5px solid #FFA254",
              borderRadius: "10px",
              backgroundColor: "#C3EEDF",
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
                }}
              >
                <p style={{ marginBottom: "20px" }}>{question.question}</p>
                <br />
                <br />
                <center className="button-row">
                  {question.choices.map((choice, i) => (
                    <div
                      key={i}
                      onClick={() => handleAnswer(i)}
                      className="button-div"
                    >
                      {choice}
                    </div>
                  ))}
                </center>
                <br />
                <br />
                <div style={{ display: "flex", justifyContent: "center" }}>
                  {index !== 0 && (
                    <div
                      onClick={handlePrevious}
                      className="button-div"
                      style={{
                        backgroundColor: "#DEBFFD",
                        marginRight: "20px",
                      }}
                    >
                      Previous
                    </div>
                  )}
                </div>
                <br />
                <br />
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
                  )
                )}
                <br></br>
              </div>
            ))}
            <br />
            <br />
            <br />
            <br />
            <br />
          </div>
        </div>
      </div>
      </div>
      <Footer />
    </div>
  );

}

export default BasicQuestions;
