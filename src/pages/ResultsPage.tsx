import React from 'react';

function ResultsPage({ results, setResults }: { results: string, setResults: React.Dispatch<React.SetStateAction<string>> }) {
  return (
    <div>
      <h1>Your Quiz Result</h1>
      <p>You are a {results}!</p>
    </div>
  );
};

export default ResultsPage;