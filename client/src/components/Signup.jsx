import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
// now we need to import usestate hook for storing the user entered data into states
import { useState } from "react";

const Signup = () => {
  const history = useNavigate();
  // create the state variable for storing the user data
  const [User, setUser] = useState({
    // create the empty state
    name: "",
    email: "",
    phone: "",
    profession: "",
    password: "",
    cpassword: "",
  });

  // create two global variable..first the fieldName,second its value
  let fieldName, fieldValue;
  // create the function
  const handleInputs = (e) => {
    // then capture the name of the field and its corresponding value from the input boxes
    fieldName = e.target.name;
    fieldValue = e.target.value;

    // now use this values to set the state.
    setUser({ ...User, [fieldName]: fieldValue });

    // ...user stores the whole template...then using square brackets we will dynamically take the name of the field and its corresponding value as the user types..
  };
  // now define the register button function to send the data entered by user to the backend server
  const PostData = async (e) => {
    // as we will use fetch api hence it returns a promise hence we are making the function asynchronous
    // ensure the form has method as POST and no action is mentioned..
    // prevent form default refresh submit
    e.preventDefault();

    // now extract the data from the state variable User
    const { name, email, phone, profession, password, cpassword } = User;

    // check if any one of them is empty then say enter all the fields
    if (!name || !email || !phone || !profession || !password || !cpassword) {
      window.alert("Please fill all fields");
      return;
    }else if(password != cpassword){
      window.alert("Passwords do not match");
      return;
    }
    else {
      // push data to the backend
      // now use fetch api to call a post method to the route /register..fetch returns a promise thus use await
      const response = await fetch("https://mern-portfolio-server-eight.vercel.app/register", {
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
          name,
          email,
          phone,
          profession,
          password,
          cpassword,
        }),
      });

      // now we have to verify the data we are getting..if error are comming...check the status codes of error in auth.js file for /register route...which is 422 and 500
      const data = await response.json();

      // now if it is error then throw it else show success message
      if (response.status === 422 || response.status === 500 || !data) {
        window.alert("Invalid Registration!!");
      } else {
        window.alert("Successfully registered");
        // push user to the login page
        history("/login");
      }
    }
  };

  return (
    // make a main container
    <div className="signup-container d-flex flex-column align-items-center">
      {/* add the sign up text */}

      <div className="MAIN glow-effect">
        <h1 id="heading" className="text-center mb-4">
          Sign Up(For New Users)
        </h1>

        {/* make a div common for both image and form then display flex this div to make them side by side*/}

        <div className="signup-content d-flex flex-column flex-lg-row justify-content-center align-items-center">
          {/* container for image */}
          <div className="signup-image-container mb-4 mb-lg-0">
            <img
              src="/assets/images/login.svg"
              alt="signup image"
              className="img-fluid"
            />
          </div>

          {/* now add the form */}
          <form className="signup-form" method="POST">
            {/* this div contains icon+text field */}

            <div className="form-group input-group mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text">
                  <i className="zmdi zmdi-account"></i>
                </span>
              </div>
              <input
                type="text"
                name="name"
                id="name"
                autoComplete="off"
                value={User.name}
                // on change the input field call a function to handle the input
                onChange={handleInputs}
                placeholder="Enter your full name"
                className="form-control"
              />
            </div>

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
                id="email"
                autoComplete="off"
                value={User.email}
                // on change the input field call a function to handle the input
                onChange={handleInputs}
                placeholder="Enter your email"
                className="form-control"
              />
            </div>

            <div className="form-group input-group mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text">
                  <i className="zmdi zmdi-phone-in-talk"></i>
                </span>
              </div>
              <input
                type="number"
                name="phone"
                id="phone"
                autoComplete="off"
                value={User.phone}
                // on change the input field call a function to handle the input
                onChange={handleInputs}
                placeholder="Enter your phone no."
                className="form-control"
              />
            </div>

            <div className="form-group input-group mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text">
                  <i className="zmdi zmdi-slideshow"></i>
                </span>
              </div>
              <input
                type="text"
                name="profession"
                id="profession"
                autoComplete="off"
                value={User.profession}
                // on change the input field call a function to handle the input
                onChange={handleInputs}
                placeholder="Enter your profession"
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
                id="password"
                autoComplete="off"
                value={User.password}
                // on change the input field call a function to handle the input
                onChange={handleInputs}
                placeholder="Enter password"
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
                name="cpassword"
                id="cpassword"
                autoComplete="off"
                value={User.cpassword}
                // on change the input field call a function to handle the input
                onChange={handleInputs}
                placeholder="Confirm your password"
                className="form-control"
              />
            </div>

            {/* now add the button to submit the data..use input for better functionality..now clicking on this button call a function to send the entered data to the backend  */}
            <div
              className="form-group form-button"
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              <input
                type="submit"
                name="signup"
                id="signup"
                value="Register Now"
                className="btn btn-primary"
                onClick={PostData}
              />

              <NavLink
                to="/login"
                className="already-reg"
                style={{
                  font: "Poppins",
                  fontWeight: "bolder",
                  fontSize: "large",
                  textDecoration: "none",
                }}
              >
                Already registered? Click here
              </NavLink>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
