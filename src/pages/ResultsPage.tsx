/* eslint-disable react-hooks/exhaustive-deps */
import "./ResultsPage.css";
import Typewriter from "typewriter-effect";
import OpenAI from "openai";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import CherryBlossom from "../components/CherryBlossom";
import { Button } from "react-bootstrap";

function ResultsPage({
  results,
  setResults,
}: {
  results: string;
  setResults: React.Dispatch<React.SetStateAction<string>>;
}) {
  const [failedGPT, setfailedGPT] = useState<boolean>(false);
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
        // do this so gpt don't throw error for using in browser. 
        dangerouslyAllowBrowser: true,
      });
      const response = await openai.chat.completions.create({
        model: "gpt-4-turbo",
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
        //changed to a stricter tempurature
        temperature: 0.2,
        n: 1,
      });
      return response.choices[0].message.content;
    } catch (error) {
      return '{"error": "Invalid key"}';
    }
  }
  // store number of attemps site called gpt
  let numTries = 0;
  // for sensitivity list for useEffect
  const dummy = false;
  // change the given answers array passed through the questions page to string to give to gpt. 
  const answers: string = useLocation().state.join(" ");
  const navigate = useNavigate();
  const setPage = (path: string) => {
    navigate(path);
  };
  useEffect(() => {
    async function get_answers() {
      if (
        // Check if (if updated in time) the current data is filled, if not then call gpt. 
        (parsedData?.job === undefined ||
        parsedData?.job === null ||
        parsedData?.job === "")
      ) {
        let gpt_data = await call_gpt(answers);
        // since this is done on page load, cannot do useState because it does not update in time, 
        // using var to store number of failed attempts instead. 
        if(numTries > 3){
          setfailedGPT(true);
          return;
        }
        numTries ++;
        if (gpt_data != null)
          try {
            const parsedData = JSON.parse(gpt_data);
            // if valid json is parsed but empty, throw error and try again.
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
            setParsedData(parsedData);
          } catch (error) {
            // call gpt again if error in getting answers or 
            await get_answers();
          }
      } else {
        return;
      }
    }

    get_answers();
    // this eslint exception is created because if theres no sensitivity component it will continously run, if it is empty or constant it throws an eslint error too... 
    // eslint-disable-next-line
  }, [dummy]);

  return (
    <div id="results-body">
      <header>
        <Button id='menu-bar' className="Merienda" onClick={() => setPage("/choices")}>&lt;</Button></header>
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
      {failedGPT && <div><br/><br/><h1>Error detected, too many unsucessful API calls, please restart your experience by going <a href="/#">here</a></h1></div>}
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
