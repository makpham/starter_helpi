import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';
import OpenAI from 'openai';
import './Footer.css';

function CheckAPIKey() {
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
          setPage("/choices");
        }else{
          window.location.reload();
        }
      }else{
        localStorage.setItem(keyState, JSON.stringify(false));
        window.location.reload();
      }
    }
  
    function changeKey(event: React.ChangeEvent<HTMLInputElement>) {
      setKey(event.target.value);
    }

    return(
        <div>
            <Form>
            <Form.Label>API Key:  </Form.Label>
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
        </div>
    )
}

export default CheckAPIKey;