/* eslint-disable react-hooks/exhaustive-deps */
import "./ResultsPage.css";
import Typewriter from "typewriter-effect";
import OpenAI from "openai";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import CherryBlossom from "./CherryBlossom";
import { Button } from "react-bootstrap";

function ResultsPage({
  results,
  setResults,
}: {
  results: string;
  setResults: React.Dispatch<React.SetStateAction<string>>;
}) {
  const [parsedData, setParsedData] = useState<{
    job: string;
    job_description: string;
    salaries: string;
    work_environment: string;
    top_companies: string[];
    how_to_start: string;
  }>();
  async function call_gpt(answer: string) {
    try {
      const openai = new OpenAI({
        apiKey: JSON.parse(localStorage.getItem("MYKEY") || ""),
        dangerouslyAllowBrowser: true,
      });
      const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content:
              "Robot that is helping with job selection that gives answers based on the user's specified format",
          },
          {
            role: "user",
            content:
              "Given these statesments: " +
              answer +
              '. give me the most suitable job that suits these conditions. Give these in the format of: { "job": string,"job_description": string, "salaries": string, "work_environment": string, "top_companies": string[], "how_to_start": string}',
          },
        ],
        temperature: 0.7,
        n: 1,
      });
      return response.choices[0].message.content;
    } catch (error) {
      return '{"error": "Invalid key"}';
    }
  }
  const dummy = false;
  const answers: string = useLocation().state.join(" ");
  const navigate = useNavigate();
  const setPage = (path: string) => {
    navigate(path);
  };
  useEffect(() => {
    async function get_answers() {
      if (
        parsedData?.job === undefined ||
        parsedData?.job === null ||
        parsedData?.job === ""
      ) {
        let gpt_data = await call_gpt(answers);
        if (gpt_data != null)
          try {
            const parsedData = JSON.parse(gpt_data);
            console.log(parsedData);
            if (
              parsedData.job === undefined ||
              parsedData.job_description === undefined ||
              parsedData.salaries === undefined ||
              parsedData.work_environment === undefined ||
              parsedData.top_companies === undefined ||
              parsedData.how_to_start === undefined
            ) {
              throw new Error();
            }
            console.log(parsedData.work_environment);
            setParsedData(parsedData);
          } catch (error) {
            console.log(error);
            await get_answers();
          }
      } else {
        return;
      }
    }

    get_answers();
    // eslint-disable-next-line
  }, [dummy]);

  return (
    <div id="results-body">
      <header><Button id='menu-bar' className="Merienda" onClick={() => setPage("/choices")}>&lt;</Button></header>
      <CherryBlossom />
      <h1>
        <Typewriter
          options={{
            delay: 50,
          }}
          onInit={(typewriter) => {
            typewriter
              .typeString(
                "Congratulations! You’ve successfully completed the questionnaire! Now, let’s dive into the results. Below, you’ll find a summary of your answers and insights:"
              )
              .start();
          }}
        />
      </h1>
      <div id="paper">
        <h2>
          Hello future <b>{parsedData?.job}</b>
        </h2>
        <br />
        <h5>
          <b>Job Description:</b>
        </h5>
        <h6>{parsedData?.job_description}</h6>
        <br />
        <h5>
          <b>Expected Salary:</b>
        </h5>
        <h6>{parsedData?.salaries}</h6>
        <br />
        <h5>
          <b>Work Enviroment:</b>
        </h5>
        <h6>{parsedData?.work_environment}</h6>
        <br />
        <h5>
          <b>Top Companies For You:</b>
        </h5>
        <h6>{parsedData?.top_companies.join(", ")}</h6>
        <br />
        <h5>
          <b>How to get started</b>
        </h5>
        <h6>{parsedData?.how_to_start}</h6>
      </div>
    </div>
  );
}

export default ResultsPage;
