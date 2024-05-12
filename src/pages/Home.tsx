import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./Home.css";
// import sideImg from "../imgs/home-side-img.png"
import { Button, Form } from 'react-bootstrap';
import Typewriter from 'typewriter-effect';
import OpenAI from 'openai';


function Home() {
  const navigate = useNavigate();
  const setPage = (path: string) => {
    navigate(path);
  };
  const saveKeyData = "MYKEY";
  const keyState = "VALIDKEY";
  let keyData = "";
  const prevKey = localStorage.getItem(saveKeyData);
  if (prevKey !== null) {
    keyData = JSON.parse(prevKey);
  }
  const [key, setKey] = useState<string>(keyData);

  function getKeyState(): boolean{
    const valid = localStorage.getItem(keyState);
    if (valid !== null){
      return JSON.parse(valid);
    }
    return false;
  }

  async function call_gpt(){
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
              "robot, respond in one word",
          },
          {
            role: "user",
            content:
              "hello"
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
  async function validateKey(){
    const valid_key = await call_gpt();
    if(valid_key !== null){
      //make sure key is valid before moving on
      try{
        if (JSON.parse(valid_key)['error'] !== null){
          localStorage.setItem(keyState, JSON.stringify(false));
        }else{
          localStorage.setItem(keyState, JSON.stringify(true));
        }
      }catch(error){
        localStorage.setItem(keyState, JSON.stringify(true));
      }
    }
  }

  async function handleSubmit() {
    if(key.trim() !== ""){
      localStorage.setItem(saveKeyData, JSON.stringify(key));
      await validateKey();
      if(getKeyState()){
        setPage("detailed-questions");
      }
    }else{
      localStorage.setItem(keyState, JSON.stringify(false));
      console.log("test");
    }
    // window.location.reload(); This may be needed for requirements but only thing is it double reload redirected page
  }

  function changeKey(event: React.ChangeEvent<HTMLInputElement>) {
    setKey(event.target.value);
  }

  // const detailed_description = "Are you ready to embark on a journey of self-discovery to find the perfect career path for you? Our detailed career quiz is designed to delve deep into your interests, skills, values, and personality traits to provide you with comprehensive insights into potential career options. Through a series of thought-provoking questions and scenarios, this quiz will analyze various aspects of your life, such as your passions, strengths, preferred work environment, and long-term goals. You can expect detailed feedback and recommendations tailored specifically to your unique profile, helping you make informed decisions about your future career path. Whether you're a recent graduate exploring your options or a seasoned professional seeking a change, our detailed career quiz is your first step towards finding a fulfilling and rewarding career that aligns with who you are.";
  // const basic_description = "Are you looking for a quick and easy way to get some direction on your career path? Our basic career quiz offers a simplified approach to helping you identify potential career options based on your interests and preferences. This quiz consists of straightforward questions designed to assess your likes, dislikes, and general aspirations. While it may not provide as much in-depth analysis as our detailed quiz, it offers a convenient starting point for those seeking some initial guidance. Whether you're a high school student exploring career options or someone considering a career change, our basic career quiz can help you narrow down your choices and point you in the right direction. It's a quick and efficient tool to kickstart your journey towards finding a career that suits you.";

  return (
    <div id='home-body'>
      <div id='welcome-text' className='alegreya'>
        <h1 id='landing-title'>
          Hello Future 
          <Typewriter
          options={{
            strings: ['Manager', 'Software Developer', 'Nurse', "Doctor", "Firefighter", "Accountants", "Actuaries", "Artist", "Pilot"],
            autoStart: true,
            loop: true,
          }}
        />
        </h1>
        <p>
          Ready to embark on your career discovery? Enter APi key to get started!
        </p>
        <footer>
          <Form>
            <Form.Label>API Key: </Form.Label>
            <br />
            <Form.Control className='api-form' id="entry"
              type="password"
              placeholder="Insert API Key Here"
              onChange={changeKey}
            ></Form.Control>
            <Button title='If you already input key before click the button' className="Submit-Button api-form" id="sbutton" onClick={handleSubmit}>
              Get Started
            </Button>
          </Form>
          <h6 id='invalid-api' hidden={getKeyState()}>*Invalid API key</h6>
        </footer>
      </div>
      <div id='side-img'>
      </div>
    </div>
  );
}

export default Home;
