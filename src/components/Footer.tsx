import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import OpenAI from "openai";
import "./Footer.css";

function CheckAPIKey() {
  const navigate = useNavigate();
  const setPage = (path: string) => {
    navigate(path);
  };
  //set MYKEY to either new key or previous key
  const saveKeyData = "MYKEY";
  //this is to store the value to check if the key is valid (between reloads)
  const keyState = "VALIDKEY";
  let keyData = "";
  const prevKey = localStorage.getItem(saveKeyData);
  if (prevKey !== null) {
    keyData = JSON.parse(prevKey);
  }
  const [key, setKey] = useState<string>(keyData);

  //function to fetch "validkey" status from local storage
  function getKeyState(): boolean {
    const valid = localStorage.getItem(keyState);
    if (valid !== null) {
      return JSON.parse(valid);
    }
    return false;
  }

  // call gpt with short messages to ensure that it is workig properly.
  async function call_gpt() {
    try {
      const openai = new OpenAI({
        // get key
        apiKey: JSON.parse(localStorage.getItem("MYKEY") || ""),
        // Required or GPT will throw error
        dangerouslyAllowBrowser: true,
      });
      const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        // roles are simple because this serves only as a test
        messages: [
          {
            role: "system",
            content: "robot, respond in one word",
          },
          {
            role: "user",
            content: "hello",
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

  // function made to set VALIDKEY local storage to appropriate values
  async function validateKey() {
    const valid_key = await call_gpt();
    if (valid_key !== null) {
      //make sure key is valid before moving on
      try {
        if (JSON.parse(valid_key)["error"] !== null) {
          localStorage.setItem(keyState, JSON.stringify(false));
        } else {
          localStorage.setItem(keyState, JSON.stringify(true));
        }
      } catch (error) {
        localStorage.setItem(keyState, JSON.stringify(true));
      }
    }
  }

  // modified original submit button to also check API key and do not allow user to go on if it is not valid.
  async function handleSubmit() {
    if (key.trim() !== "") {
      localStorage.setItem(saveKeyData, JSON.stringify(key));
      await validateKey();
      if (getKeyState()) {
        setPage("/choices");
      } else {
        window.location.reload();
      }
    } else {
      localStorage.setItem(keyState, JSON.stringify(false));
      window.location.reload();
    }
  }
  // change the KEY local storage.
  function changeKey(event: React.ChangeEvent<HTMLInputElement>) {
    setKey(event.target.value);
  }

  return (
    <div>
      <Form>
        <Form.Label>API Key: </Form.Label>
        <Form.Control
          className="api-form"
          id="entry"
          type="password"
          placeholder="Insert API Key Here"
          onChange={changeKey}
        ></Form.Control>
        <Button
          title="If you already input key before click the button"
          className="Submit-Button api-form"
          id="sbutton"
          onClick={handleSubmit}
        >
          Get Started
        </Button>
      </Form>
      <h6 id="invalid-api" hidden={getKeyState()}>
        *Invalid API key
      </h6>
    </div>
  );
}

export default CheckAPIKey;
