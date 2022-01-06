import React from "react";
import "./About.css";
import { useHistory } from "react-router-dom";

function About() {
  const history = useHistory();
  const handleRegister = (e) => {
    e.preventDefault();
    history.push("/register");
  };

  return (
    <div className="aboutContainer">
      <div className="aboutWrapper">
        <div className="aboutWriteUps">
          <span className="aboutGreeting">Hello, Welcome to</span>
          <h1 className="blogName">JUST READ BLOG</h1>
          <span className="aboutDescription">
            Just Read is an open source publishing platform developed by Aloko
            Joseph and launched in September 2021. The platform is an example of
            social journalism, having a hybrid collection of amateur and
            professional people and publications, or exclusive blogs or
            publishers and is regularly regarded as a blog host.
          </span>
          <div className="signUp">
            <button className="BecomeAWriter" onClick={handleRegister}>
              Become a Writer Now!
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
