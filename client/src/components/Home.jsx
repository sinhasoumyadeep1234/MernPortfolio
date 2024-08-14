import React from "react";
import { useState,useEffect } from "react";
const Home = () => {
    // now the data got by fetch api needs to be stored in a state then can be set in the appropriate places of our component
    const [user, setuser] = useState('');
    const [show, setshow] = useState(false);
    const callHomePage = async () => {
      try {
        // call fetch request to the backend route /getdata to authenticate the user..note the form must have get method..as the authentication logic of contact page is written for get request
        const response = await fetch("/getData", {
          // for the header and body the things will change
          method: "GET",
          headers: {
            "Content-Type": "application/json"
          },
        });
  
        // now if a user is present having the credentials then in response we will get the whole collection
        const data = await response.json();
        // console.log("User data returned as inside contact component: ", data);
        // save the data in the state
        setuser(data.name);
        setshow(true);
  
        // if we get the data then no problem add the data in the about component template else throw error
  
        if (!response.status === 200) {
          // throw error
          const error = new Error(res.error);
          throw error;
        }
      } catch (err) {
        console.log(err);
        // means user is not authenticated show him normal home page
      }
    }
  
    // now the moment about page opens we need to validate the user as his details needs to be updated on the about page dynamically..thus we will use useeffect hook
    useEffect(() => {
      // call a function..we need only one time the function gets called hence the array is empty
      callHomePage();
    }, []);

  return (
    <div className="home-wrapper">
      <div className="home-container">
        <div className="bio">
          <h1>{show?`Happy To See You Back "${user}". Welcome to Soumyadeep's portfolio Website😊`: `Hello, I am Soumyadeep Sinha(Soumo)`}</h1>
          <p>
            " I am a Computer Science and Engineering graduate with a strong
            passion <br></br> for web development and software engineering. Currently, I'm
            delving deep<br></br> into the MERN stack and honing my skills by building
            this portfolio website" <br></br>~ Soumyadeep.
          </p>
          <a
            href="/assets/resume/SoumyadeepSinhaResume.pdf"
            className="resume-button glow-effect"
            target="_blank"
            rel="noopener noreferrer"
         style={{textDecoration:"none"}} >
            My Resume
          </a>
        </div>
        <div className="image-container">
        </div>
      </div>
      <div className="background-shape"></div>
    </div>
  );
};

export default Home;
