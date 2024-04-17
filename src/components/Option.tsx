import React from 'react';
import "./Option.css";

interface OptionProps {
  OptionTitle: string;
  OptionDescription: string;
  onClick: () => void;
  style?: React.CSSProperties;
}

export function Option(prop: OptionProps) {
  return (
    <div className="container" onClick={prop.onClick} style={prop.style}>
      <h1 className="title">{prop.OptionTitle}</h1>
      <p className="description">{prop.OptionDescription}</p>
    </div>
  );
}