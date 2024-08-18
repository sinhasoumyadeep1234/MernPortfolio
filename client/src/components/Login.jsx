import React from "react";
import { NavLink , useNavigate } from "react-router-dom";
import { useState ,useContext } from "react";
import {userContext} from "../App";


const Login = () => {

  // use use context
  const {state,dispatch} = useContext(userContext);


  const history=useNavigate();
  // create two states for email and password
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    // form has a auto reload functionality hence we need to prevent it
    e.preventDefault();

    

    const response = await fetch("https://mern-portfolio-server-eight.vercel.app/signin", {
      // now we have to define the content type,header and body
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials:"include",
      // remember we can send json to the server as they only accept string values..thus we will have to convert the json data to strings
      body: JSON.stringify({
        // now use your dynamic variables
        // send key value pairs: nameEnteredbyUser:backendUserNameVariable,emailEnteredbyUser:backendEmailVariable..etc...but if both the variables have same name then no need to write in this format..simply write the variable name
        email,
        password,
      }),
    });

    // now we have to verify the data we are getting..if error are comming...check the status codes of error in auth.js file for /register route...which is 422 and 500
    const data = await response.json();

    // now if it is error then throw it else show success message
    if (response.status === 422 || response.status === 400 || !data) {
      window.alert("Invalid Credentials!!");
    } else {
      // if user is login the call the dispatcher action type is user and payload value is true..and vice versa in logout component
      dispatch({type:"USER",payload:true});

      window.alert("Login Successful");
      // push user to the login page
      history("/");
    }


  };

  return (
    // make a main container
    <div className="signup-container d-flex flex-column align-items-center">
      {/* add the Login up text */}

      <div className="MAIN glow-effect">
        <h1 id="heading" className="text-center mb-4">
          Login(For Registered Users)
        </h1>

        {/* make a div common for both image and form then display flex this div to make them side by side*/}

        <div className="signup-content d-flex flex-column flex-lg-row justify-content-center align-items-center">
          {/* container for image */}
          <div className="signup-image-container mb-4 mb-lg-0">
            <img
              src="/assets/images/signup.svg"
              alt="login image"
              className="img-fluid"
            />
          </div>

          {/* now add the form */}
          <form className="signup-form" method="POST">
            {/* this div contains icon+text field */}

            {/* repeat for other fields */}
            <div className="form-group input-group mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text">
                  <i className="zmdi zmdi-email"></i>
                </span>
              </div>
              <input
                type="email"
                name="email"
                value={email}
                // get the user email and update the state
                onChange={(e) => setEmail(e.target.value)}
                id="email"
                autoComplete="off"
                placeholder="Enter your email"
                className="form-control"
              />
            </div>

            <div className="form-group input-group mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text">
                  <i className="zmdi zmdi-lock"></i>
                </span>
              </div>
              <input
                type="password"
                name="password"
                value={password}
                // get the user password and update the state accordingly
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                id="password"
                autoComplete="off"
                placeholder="Enter your password"
                className="form-control"
              />
            </div>

            {/* now add the button to submit the data..use input for better functionality */}

            <div
              className="form-group form-button"
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              <input
                type="submit"
                name="login"
                id="login"
                value="Login"
                className="btn btn-primary"
                // on clicking on submit button
                onClick={handleLogin}
              />

              <NavLink
                to="/registration"
                className="already-reg"
                style={{
                  font: "Poppins",
                  fontWeight: "bolder",
                  fontSize: "large",
                  textDecoration: "none",
                }}
              >
                New user? Create an account now
              </NavLink>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
