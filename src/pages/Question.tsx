import React from 'react';

interface QuestionProps {
  question: string;
  choices: string[];
  onChoiceSelected: (choice: string) => void;
}

const Question: React.FC<QuestionProps> = ({ question, choices, onChoiceSelected }) => {
  return (
    <div>
      <h2>{question}</h2>
      {choices.map((choice, index) => (
        <button key={index} onClick={() => onChoiceSelected(choice)}>
          {choice}
        </button>
      ))}
    </div>
  );
}

export default Question;