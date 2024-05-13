import React, { useEffect } from 'react';
import './CherryBlossom.css';

const CherryBlossom: React.FC = () => {
  const numPetals = 100;

  useEffect(() => {
    const petals = document.querySelectorAll('.petal') as NodeListOf<HTMLElement>;
    petals.forEach(petal => {
      petal.style.left = `${Math.random() * 100}vw`;
      petal.style.animationDuration = `${5 + Math.random() * 5}s`;
      petal.style.animationDelay = `-${Math.random() * 5}s`;
    });
  }, []);

  return (
    <div id="petal-container">
      {Array.from({ length: numPetals }).map((_, index) => (
        <div key={index} className="petal"></div>
      ))}
    </div>
  );
};

export default CherryBlossom;
