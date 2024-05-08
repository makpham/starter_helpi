import React from 'react';

interface ResultsPageProps {
  result: string;
}

const ResultsPage: React.FC<ResultsPageProps> = ({ result }) => {
  return (
    <div>
      <h1>Your Quiz Result</h1>
      <p>You are a {result}!</p>
    </div>
  );
};

export default ResultsPage;