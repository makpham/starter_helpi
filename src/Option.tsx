// import React, { useState } from 'react';
// import logo from './logo.svg';
// import './App.css';
// import { Button, Form } from 'react-bootstrap';
import './Option.css'
interface OptionProps{
    OptionTitle: string;
    OptionDescription: string;
    OptionHeight: string;
};

export function Option(prop: OptionProps){
    return <div className='container' style={{height: prop.OptionHeight}}>
            <h1 className='title'>{prop.OptionTitle}</h1>
            <p className='description'>
                {prop.OptionDescription}
            </p>
    </div>
}