import React, { useState } from "react";
import "./App.css";
import { Routes, Route, HashRouter } from "react-router-dom";
import Home from "./pages/Home";
import BasicQuestions from "./pages/BasicQuestions";
import DetailedQuestions from "./pages/DetailedQuestions";
import ResultsPage from "./pages/ResultsPage"; 

function App() {
  const [results, setResults] = useState("");

  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/detailed-questions" element={<DetailedQuestions results={results} setResults={setResults}/>} />
        <Route path="/basic-questions" element={<BasicQuestions />} />
        <Route path="/results" element={<ResultsPage results={results} setResults={setResults} />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
