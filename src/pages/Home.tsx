import "./Home.css";
import Typewriter from "typewriter-effect";
import CherryBlossom from "../components/CherryBlossom";
import CheckAPIKey from "../components/Footer";

function Home() {
  return (
    <div id="home-body">
      <CherryBlossom />
      <div id="welcome-text">
        <h1 id="landing-title">
          Hello Future
          <Typewriter
            options={{
              strings: [
                "Manager",
                "Software Developer",
                "Nurse",
                "Doctor",
                "Firefighter",
                "Accountants",
                "Actuaries",
                "Artist",
                "Pilot",
              ],
              autoStart: true,
              loop: true,
            }}
          />
        </h1>
        <p className="intro-text">
          Ready to embark on your career discovery? Enter API key to get
          started!
        </p>
        <CheckAPIKey />
      </div>
      <div id="side-img"></div>
      <div className="company-text">Future「Quest」</div>
    </div>
  );
}

export default Home;
