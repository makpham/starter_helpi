import React, { useState } from 'react';
import "./Choices.css";
import Typewriter from 'typewriter-effect';
import { Divider } from '@mui/material';

function Choices() {
    return <div id='choice-body'>
        <h1>
            <Typewriter
                options={{
                    delay: 50
                }}
                onInit={(typewriter) => {
                    typewriter.typeString('The journey of a thousand miles begins with one single step.')
                        .start();
                }}
            />
        </h1>

        <div id='wait-typewriter'>
            asdfasd
        </div>
    </div>
}

export default Choices;
