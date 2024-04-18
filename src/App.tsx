import React, { useState } from "react";
import "./App.css";
import { Routes, Route, Link, HashRouter, useLocation } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import Home from "./pages/Home";
import BasicQuestions from "./pages/BasicQuestions";
import DetailedQuestions from "./pages/DetailedQuestions";
import { MenuBar } from "./components/Menu";
import img from "./CISC275Logo.webp";

//local storage and API Key: key should be entered in by the user and will be stored in local storage (NOT session storage)
let keyData = "";
const saveKeyData = "MYKEY";
const prevKey = localStorage.getItem(saveKeyData); //so it'll look like: MYKEY: <api_key_value here> in the local storage when you inspect
if (prevKey !== null) {
  keyData = JSON.parse(prevKey);
}

function Header() {
  const location = useLocation();
  const menuItems = [
    { label: "Home", route: "/" },
    { label: "Detailed Question", route: "/detailed-questions" },
    { label: "Basic Question", route: "/basic-questions" },
  ];

  const filteredMenuItems = menuItems.filter(item => item.route !== location.pathname);

  if (location.pathname === '/') {
    return null;
  }

  return (
    <header>
      <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent:'center'}}>
        <Link to="/"><img src={img} className="logo" alt="404"/></Link>
        <h1 className="site-name">Starter Helpi</h1>
      </div>
      <MenuBar items={filteredMenuItems} />
    </header>
  );
}

function App() {
  const [key, setKey] = useState<string>(keyData); //for api key input

  //sets the local storage item to the api key the user inputed
  function handleSubmit() {
    localStorage.setItem(saveKeyData, JSON.stringify(key));
    window.location.reload(); //when making a mistake and changing the key again, I found that I have to reload the whole site before openai refreshes what it has stores for the local storage variable
  }

  //whenever there's a change it'll store the api key in a local state called key but it won't be set in the local storage until the user clicks the submit button
  function changeKey(event: React.ChangeEvent<HTMLInputElement>) {
    setKey(event.target.value);
  }

  return (
    <HashRouter>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/detailed-questions" element={<DetailedQuestions />} />
        <Route path="/basic-questions" element={<BasicQuestions />} />
      </Routes>

      {/* API Key */}
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
      
    </HashRouter>
  );
}

export default App;
