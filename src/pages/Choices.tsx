import "./Choices.css";
import Typewriter from 'typewriter-effect';
import { useNavigate } from 'react-router-dom';
import CherryBlossom from "../components/CherryBlossom";
import BackButton from "../components/BackButton";

function Choices() {
    const navigate = useNavigate();
    const setPage = (path: string) => {
      navigate(path);
    };
    const detailed_description = "Are you ready to embark on a journey of self-discovery to find the perfect career path for you? Our detailed career quiz is designed to delve deep into your interests, skills, values, and personality traits to provide you with comprehensive insights into potential career options. Through a series of thought-provoking questions and scenarios, this quiz will analyze various aspects of your life, such as your passions, strengths, preferred work environment, and long-term goals. You can expect detailed feedback and recommendations tailored specifically to your unique profile, helping you make informed decisions about your future career path. Whether you're a recent graduate exploring your options or a seasoned professional seeking a change, our detailed career quiz is your first step towards finding a fulfilling and rewarding career that aligns with who you are.";
    const basic_description = "Are you looking for a quick and easy way to get some direction on your career path? Our basic career quiz offers a simplified approach to helping you identify potential career options based on your interests and preferences. This quiz consists of straightforward questions designed to assess your likes, dislikes, and general aspirations. While it may not provide as much in-depth analysis as our detailed quiz, it offers a convenient starting point for those seeking some initial guidance. Whether you're a high school student exploring career options or someone considering a career change, our basic career quiz can help you narrow down your choices and point you in the right direction. It's a quick and efficient tool to kickstart your journey towards finding a career that suits you.";

    return <div id='choice-body'>
        <header>
          <BackButton page="/"/>
        </header>
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
            Embark on your exciting journey by selecting either a basic or a detailed questionnaire. This will help you discover the career path that aligns perfectly with your interests, skills, and aspirations!
            <CherryBlossom />
        </div>
        <div id='wait-twice'>
            <div id='basic'><h1>Basic</h1>{basic_description}<br /><br /><div id='get-started-basic'><button onClick={() => setPage("/basic-questions")}>Get Started</button></div></div>
            <div id='detailed'><h1>Detailed</h1>{detailed_description}<br /><br /><div id='get-started-detailed'><button onClick={() => setPage("/detailed-questions")}>Get Started</button></div></div>
        </div>
    </div>
}

export default Choices;
