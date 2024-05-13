import "./ResultsPage.css";
import Typewriter from 'typewriter-effect';
import ReactCardFlip from 'react-card-flip';
import OpenAI from "openai";
import { useLocation } from "react-router-dom";
import { useState } from "react";


function ResultsPage({ results, setResults }: { results: string, setResults: React.Dispatch<React.SetStateAction<string>> }) {
    const [gptData, setGPTData] = useState<string>("");
    async function call_gpt(answer: string){
        try {
          const openai = new OpenAI({
            apiKey: JSON.parse(localStorage.getItem("MYKEY") || ""),
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
                  "Given these statesments: " + answer + ". give me the most suitable job that suits these conditions. Give these in the format of: { 'job': string, salaries: string, 'work_enviroment': string, 'top_companies': string[]}"
              },
            ],
            temperature: 0.7,
            n: 1,
          });
          return response.choices[0].message.content;
        } catch (error) {
          return "{\"error\": \"Invalid key\"}"
        }
      }
      const answers: string = useLocation().state.join(" ");
      const gpt_answer = call_gpt(answers);
      (async () => {
        console.log(await call_gpt(answers));
        })();
      
  return (
    <div id="results-body">
        <h1>
            <Typewriter
                options={{
                    delay: 50
                }}
                onInit={(typewriter) => {
                    typewriter.typeString('Congratulations! You’ve successfully completed the questionnaire! Now, let’s dive into the results. Below, you’ll find a summary of your answers and insights:')
                        .start();
                }}
            />
        </h1>

        <ReactCardFlip isFlipped={false} flipDirection="vertical">
        <div className="font">
          This is the front of the card.
        </div>

        <div className="back">
            back of the ReactCardFlip
        </div>
        </ReactCardFlip>
    </div>
  );
};

export default ResultsPage;