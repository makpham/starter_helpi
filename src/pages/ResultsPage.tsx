import "./ResultsPage.css";
import Typewriter from 'typewriter-effect';


function ResultsPage({ results, setResults }: { results: string, setResults: React.Dispatch<React.SetStateAction<string>> }) {
  
  return (
    <div id="results-body">
        <h1>
            <Typewriter
                options={{
                    delay: 50
                }}
                onInit={(typewriter) => {
                    typewriter.typeString('Congratulations! You’ve successfully completed the questionnaire! Now, let’s dive into the results. Below, you’ll find a summary of your answers and insights:')
                        .start();
                }}
            />
        </h1>
    </div>
  );
};

export default ResultsPage;