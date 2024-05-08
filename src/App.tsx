import React from "react";
import "./App.css";
import { Routes, Route, HashRouter } from "react-router-dom";
import Home from "./pages/Home";
import BasicQuestions from "./pages/BasicQuestions";
import DetailedQuestions from "./pages/DetailedQuestions";

function App() {

  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/detailed-questions" element={<DetailedQuestions />} />
        <Route path="/basic-questions" element={<BasicQuestions />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
