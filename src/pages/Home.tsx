import React from 'react';
import { Option } from '../components/Option';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
const detailed_description = "Are you ready to embark on a journey of self-discovery to find the perfect career path for you? Our detailed career quiz is designed to delve deep into your interests, skills, values, and personality traits to provide you with comprehensive insights into potential career options. Through a series of thought-provoking questions and scenarios, this quiz will analyze various aspects of your life, such as your passions, strengths, preferred work environment, and long-term goals. You can expect detailed feedback and recommendations tailored specifically to your unique profile, helping you make informed decisions about your future career path. Whether you're a recent graduate exploring your options or a seasoned professional seeking a change, our detailed career quiz is your first step towards finding a fulfilling and rewarding career that aligns with who you are.";
const basic_description = "Are you ready to embark on a journey of self-discovery to find the perfect career path for you? Our detailed career quiz is designed to delve deep into your interests, skills, values, and personality traits to provide you with comprehensive insights into potential career options. Through a series of thought-provoking questions and scenarios, this quiz will analyze various aspects of your life, such as your passions, strengths, preferred work environment, and long-term goals. You can expect detailed feedback and recommendations tailored specifically to your unique profile, helping you make informed decisions about your future career path. Whether you're a recent graduate exploring your options or a seasoned professional seeking a change, our detailed career quiz is your first step towards finding a fulfilling and rewarding career that aligns with who you are.";

function Home() {
  return (
    <div>
      <h1>Home</h1>
      <Link to="/basic-questions">
            <button className="App-button-option">
              <Option OptionDescription={basic_description} OptionTitle='Basic Questions' OptionHeight='30em'/>
            </button>
          </Link>
          <Link to="/detailed-questions">
            <button className="App-button-option">
              <Option OptionDescription={detailed_description} OptionTitle='Detailed Questions' OptionHeight='30em'/>
            </button>
          </Link>
    </div>
  );
}

export default Home;