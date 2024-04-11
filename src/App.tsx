import React, { useState } from "react";
import "./App.css";
import { Button, Form } from "react-bootstrap";
import Home from "./pages/Home";
import BasicQuestions from "./pages/BasicQuestions";
import DetailedQuestions from "./pages/DetailedQuestions";
import { Option } from "./components/Option";

//local storage and API Key: key should be entered in by the user and will be stored in local storage (NOT session storage)
let keyData = "";
const saveKeyData = "MYKEY";
const prevKey = localStorage.getItem(saveKeyData); //so it'll look like: MYKEY: <api_key_value here> in the local storage when you inspect
if (prevKey !== null) {
  keyData = JSON.parse(prevKey);
}

function App() {
  const [key, setKey] = useState<string>(keyData); //for api key input

  const detailed_description =
    "Are you ready to embark on a journey of self-discovery to find the perfect career path for you? Our detailed career quiz is designed to delve deep into your interests, skills, values, and personality traits to provide you with comprehensive insights into potential career options. Through a series of thought-provoking questions and scenarios, this quiz will analyze various aspects of your life, such as your passions, strengths, preferred work environment, and long-term goals. You can expect detailed feedback and recommendations tailored specifically to your unique profile, helping you make informed decisions about your future career path. Whether you're a recent graduate exploring your options or a seasoned professional seeking a change, our detailed career quiz is your first step towards finding a fulfilling and rewarding career that aligns with who you are.";
  const basic_description =
    "Are you looking for a quick and easy way to get some direction on your career path? Our basic career quiz offers a simplified approach to helping you identify potential career options based on your interests and preferences. This quiz consists of straightforward questions designed to assess your likes, dislikes, and general aspirations. While it may not provide as much in-depth analysis as our detailed quiz, it offers a convenient starting point for those seeking some initial guidance. Whether you're a high school student exploring career options or someone considering a career change, our basic career quiz can help you narrow down your choices and point you in the right direction. It's a quick and efficient tool to kickstart your journey towards finding a career that suits you.";
  //sets the local storage item to the api key the user inputed
  function handleSubmit() {
    localStorage.setItem(saveKeyData, JSON.stringify(key));
    window.location.reload(); //when making a mistake and changing the key again, I found that I have to reload the whole site before openai refreshes what it has stores for the local storage variable
  }

  //whenever there's a change it'll store the api key in a local state called key but it won't be set in the local storage until the user clicks the submit button
  function changeKey(event: React.ChangeEvent<HTMLInputElement>) {
    setKey(event.target.value);
  }

  const [page, setPage] = useState("home");

  function renderPage() {
    switch (page) {
      case "home":
        return <Home />;
      case "basic-questions":
        return <BasicQuestions />;
      case "detailed-questions":
        return <DetailedQuestions />;
      default:
        return <Home />;
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        {/* <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p> */}
        {/* <p>
          Makayla Pham, Trung Nguyen, Jared Miller, Araf Jahin
        </p> */}
        {/* <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a> */}
      </header>

      <body className="App-body">
        {page === "home" && (
          <div>
            <h1>Home</h1>
            <div
              style={{
                display: "flex",
                height: "100%",
                justifyContent: "-moz-initial",
                gap: "5em",
                padding: "5em",
              }}
            >
              <Option
                onClick={() => setPage("basic-questions")}
                OptionDescription={basic_description}
                OptionTitle="Basic Questions"
              />
              <Option
                onClick={() => setPage("basic-questions")}
                OptionDescription={detailed_description}
                OptionTitle="Detailed Questions"
              />
            </div>
          </div>
        )}
        {(page === "basic-questions" || page === "detailed-questions") && (
          <div>
            <button className="App-button-home" onClick={() => setPage("home")}>
              Home
            </button>
          </div>
        )}
        {renderPage()}
      </body>

      <footer className="App-footer">
        <Form>
          <Form.Label>API Key:</Form.Label>
          <Form.Control
            type="password"
            placeholder="Insert API Key Here"
            onChange={changeKey}
          ></Form.Control>
          <br></br>
          <Button className="Submit-Button" onClick={handleSubmit}>
            Submit
          </Button>
        </Form>
      </footer>
    </div>
  );
}

export default App;
