import React, { useState } from "react";
import { ProgressBar, Button } from "react-bootstrap";
import OpenAI from "openai";

function BasicQuestions() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [currentGPTAnswer, setGPTAnswer] = useState(0);
  const [isLastQuestionAnswered, setIsLastQuestionAnswered] = useState(false);
  const [gpt_answer, setGptAnswer] = useState([
    {
      fields: [
        {
          name: "sample name",
          percentage: 0,
        },
      ],
    }
  ])
  const openai = new OpenAI({
    apiKey: JSON.parse(localStorage.getItem("MYKEY") || ""),
    dangerouslyAllowBrowser: true,
  });
  const questions = [
    {
      question:
        "1. What are your top three professional strengths, and how have they influenced your career choices?",
      choices: ["Choice 1", "Choice 2", "Choice 3", "Choice 4"],
    },
    {
      question:
        "2. Describe a time when you overcame a significant challenge at work. What did you learn from that experience?",
      choices: ["Choice 1", "Choice 2", "Choice 3", "Choice 4"],
    },
    {
      question:
        "3. How do you prioritize your tasks and manage time when facing tight deadlines?",
      choices: ["Choice 1", "Choice 2", "Choice 3", "Choice 4"],
    },
    {
      question:
        "4. Other than financial incentives, what motivates you to perform well in your job?",
      choices: ["Choice 1", "Choice 2", "Choice 3", "Choice 4"],
    },
    {
      question:
        "5. Can you give an example of how you have continued to learn and grow professionally in the past year?",
      choices: ["Choice 1", "Choice 2", "Choice 3", "Choice 4"],
    },
    {
      question:
        "6. How do you balance teamwork with individual responsibility in a work environment?",
      choices: ["Choice 1", "Choice 2", "Choice 3", "Choice 4"],
    },
    {
      question: "7. What type of work environment do you succeed in, and why?",
      choices: ["Choice 1", "Choice 2", "Choice 3", "Choice 4"],
    },
  ];

  const handlePrevious = () => {
    if (isLastQuestionAnswered) {
      setIsLastQuestionAnswered(false);
    } else if (currentQuestion > 0) {
      if (currentGPTAnswer > 0) setGPTAnswer(currentGPTAnswer - 1);
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
      console.log(response.choices[0].message.content);
      return response.choices[0].message.content;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleAnswer = async (choice_index: number) => {
    if (currentQuestion < questions.length - 1) {
      const question_answered = questions[currentQuestion]["question"];
      const answer = questions[currentQuestion]["choices"][choice_index];
      while (true) {
        try {
          const gpt_call = await call_gpt(question_answered, answer);
          setGptAnswer([...gpt_answer, JSON.parse(gpt_call || "")])
          setCurrentQuestion(currentQuestion + 1);
          setGPTAnswer(currentGPTAnswer + 1);
          console.log(gpt_answer)
          console.log(currentGPTAnswer)
          break;
        } catch (error) {
          continue;
        }
      }
    } else {
      setIsLastQuestionAnswered(true);
    }
  };

  const progress =
    ((currentQuestion + (isLastQuestionAnswered ? 1 : 0)) / questions.length) *
    100;

  return (
    <div
      style={{ display: "flex", flexDirection: "column", position: "relative" }}
    >
      <h1>Basic Questions</h1>
      <br />
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
          <div
            style={{
              display: "flex",
              alignItems: "center",
              border: "1px solid black",
              borderRadius: "5px",
              overflow: "hidden",
              flex: 1,
            }}
          >
            <ProgressBar
              striped
              animated={progress < 100}
              now={progress}
              variant={progress === 100 ? "success" : "primary"}
              style={{ width: "100%" }}
            />
          </div>
          <span style={{ marginLeft: "10px" }}>{progress.toFixed(0)}%</span>
          {isLastQuestionAnswered && (
            <div style={{ marginLeft: "10px" }}>
              <Button
                onClick={() => console.log("Get results")}
                style={{ whiteSpace: "nowrap" }}
              >
                Get results
              </Button>
            </div>
          )}
        </div>
      </div>
      <br></br>
      {questions.map((question, index) => (
        <div
          key={index}
          style={{
            display: index === currentQuestion ? "block" : "none",
            textAlign: "center",
          }}
        >
          <p style={{ marginBottom: "20px" }}>{question.question}</p>
          <div>
            {question.choices.map((choice, i) => (
              <Button
                key={i}
                onClick={() => handleAnswer(i)}
                style={{ margin: "5px" }}
                value-={choice}
              >
                {choice}
              </Button>
            ))}
          </div>
          {index !== 0 && (
            <div style={{ marginTop: "20px" }}>
              <Button onClick={handlePrevious}>Previous</Button>
            </div>
          )}
        </div>
      ))}
      {gpt_answer.map((answer: object, index: number) => (
        <div
          key={index}
          style={{
            display: index === currentGPTAnswer ? "block" : "none",
            textAlign: "center",
          }}
        >
          {JSON.stringify(answer)}
        </div>
      ))}
      <br></br>
    </div>
  );
}

export default BasicQuestions;
