import React, { useEffect, useState } from 'react';
import { OpenAI } from 'openai';
import "./ResultsPage.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import result from "../imgs/result.png";
import officebg from "../imgs/officebg.png";

function ResultsPage({ results, setResults }: { results: string, setResults: React.Dispatch<React.SetStateAction<string>> }) {
  const openai = new OpenAI({
    apiKey: JSON.parse(localStorage.getItem("MYKEY") || ""),
    dangerouslyAllowBrowser: true,
  });

  const call_gpt_jobs = async (results: string[]) => {
    try {
      const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content:
              "You are a job assistant. Given these traits: " + results.join(', ') + ", please provide 3 ideal job roles of any area, include their median salary and schooling requirements.",
          },
        ],
        temperature: 0.7,
        n: 1,
      });
      const content = response.choices[0].message.content;
      if (content) {
        const jobs = content.replace("Of course! Here are the job roles for you: ", "");
        return jobs;
      }
      return "";
    } catch (error) {
      return "{\"error\": \"Invalid key\"}"
    }
  };

const [jobs, setJobs] = useState<string[]>([]);

useEffect(() => {
  const fetchJobs = async () => {
    const traits = results.split(', ');
    const gptResults = await call_gpt_jobs(traits);
    if (gptResults) {
      const jobs = gptResults.split(', ');
      setJobs(jobs);
    }
  };

  fetchJobs();
}, []);

const call_gpt_synopsis = async (results: string[]) => {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            "You are a motivator. Given these traits: " + results.join(', ') + ", the user is please provide a synopsis of strenths from these traits in a short paragraph without numbering them.",
        },
      ],
      temperature: 0.7,
      n: 1,
    });
    const content = response.choices[0].message.content;
    if (content) {
      const jobs = content.replace("Of course! Here are the job roles for you: ", "");
      return jobs;
    }
    return "";
  } catch (error) {
    return "{\"error\": \"Invalid key\"}"
  }
};

const [synopsis, setSynopsis] = useState<string[]>([]);

useEffect(() => {
const fetchSynopsis = async () => {
  const traits = results.split(', ');
  const gptResults = await call_gpt_synopsis(traits);
  if (gptResults) {
    const synopsis = gptResults.split(', ');
    setSynopsis(synopsis);
  }
};

fetchSynopsis();
}, []);


  
  return (
    <div>
      <Header />
      <div className="results-container" style={{ backgroundImage: `url(${officebg})` }}>
        <img src={result} alt="result" className="my-image" />
        <div className="results-card">
          <h1 className="results-title">Your Quiz Result</h1>
          <h2 className="results-subtitle">Job Roles:</h2>
          <p className="results-text">{jobs.join(', ')}</p>
          <h2 className="results-subtitle">Synopsis:</h2>
          <p className="results-text">{synopsis.join(', ')}</p>
        </div>
      </div>
      <Footer />
  </div>
  );
};

export default ResultsPage;