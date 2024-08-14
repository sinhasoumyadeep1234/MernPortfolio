import React from "react";
import { useEffect, useState } from "react";

const Contact = () => {
  // now the data got by fetch api needs to be stored in a state then can be set in the appropriate places of our component
  const [user, setuser] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });

  const callContactPage = async () => {
    try {
      // call fetch request to the backend route /about to authenticate the user..note the form must have get method..as the authentication logic of contact page is written for get request
      const response = await fetch("/getData", {
        // for the header and body the things will change
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        },
      });

      // now if a user is present having the credentials then in response we will get the whole collection
      const data = await response.json();
      console.log("User data returned as inside contact component: ", data);
      // save the data in the state
      setuser({
        ...user,
        name: data.name,
        email: data.email,
        phone: data.phone
      });

      // if we get the data then no problem add the data in the about component template else throw error

      if (!response.status === 200) {
        // throw error
        const error = new Error(res.error);
        throw error;
      }
    } catch (err) {
      console.log(err);
      // means user is not authenticated show him normal contact form
    }
  }

  // now the moment about page opens we need to validate the user as his details needs to be updated on the about page dynamically..thus we will use useeffect hook
  useEffect(() => {
    // call a function..we need only one time the function gets called hence the array is empty
    callContactPage();
  }, []);



  // storing the contact form data into states
  const handleInputs = (e) => {
    // capture the attribute name and its corresponding values
    const fieldName = e.target.name;
    const fieldValue = e.target.value;

    // setData of the state
    // dynamically get the field name and its value from e object
    setuser({ ...user, [fieldName]:fieldValue });
  }



  // sending the state data to our backend
  const sendMessageData = async (e) => {
    // as form gets refreshed automatically hence we must prevent default autorefresh behaviour
    e.preventDefault();

    // now using destructuring extract the data from the state
    const { name, email, phone, message } = user;

    const response = await fetch("/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name,
        email,
        phone,
        message,
      })
    });

    const data = await response.json();
    console.log("contact data is", data);
    console.log("response is", response);

    if (response.status === 400) {
      alert(
        "Error: Couldn't send message at the moment!! Please fill all the fields properly. Check in case of any wrong email/phone/name provided by you!!"
      );
    } else {
      // message got send
      alert("Message sent successfully");
      // after message is sent empty the message field from the state..so that after sending the message the form will also get empty..only the message part
      setuser({ ...user, message: "" });
    }
  }

  return (
    <>
      <div className="contact_info">
        <div className="container-fluid">
          <div className="row">
            <div
              className="col-lg-10 offset-lg-1 d-flex justify-content-between"
              style={{ justifyContent: "space-between" }}
            >
              {/* now add 3 cards for phone,email and address */}
              {/* 1. phone number */}
              <div
                className="contact_info_item"
                style={{ display: "flex", alignItems: "start", gap: 10 }}
              >
                <div className="image">
                  {/* icon goes here */}
                  <i className="zmdi zmdi-smartphone-android"></i>
                </div>
                <div className="info">
                  {/* details goes here */}
                  <p>Phone</p>
                  <p>+91 7001810880</p>
                </div>
              </div>
              <div
                className="contact_info_item"
                style={{ display: "flex", alignItems: "start", gap: 10 }}
              >
                <div className="image">
                  {/* icon goes here */}
                  <i className="zmdi zmdi-email"></i>
                </div>
                <div className="info">
                  {/* details goes here */}
                  <p>Email</p>
                  <p>soumyadeepsinha2001@gmail.com</p>
                </div>
              </div>

              <div
                className="contact_info_item"
                style={{ display: "flex", alignItems: "start", gap: 10 }}
              >
                <div className="image">
                  {/* icon goes here */}
                  <i className="zmdi zmdi-home"></i>
                </div>
                <div className="info">
                  {/* details goes here */}
                  <p>Address</p>
                  <p>Ranaghat,Nadia</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* contact us form */}
      <div className="contact_form">
        <div className="container">
          <div className="row">
            <div className="col-lg-10 offset-lg-1">
              <div className="contact_form_container py-5">
                <div className="contact-heading">Get in touch</div>
                {/* form */}
                <form method="POST" id="contact_form_new">
                  {/* inside we have many fields */}
                  <div className="contact_form_name ">
                    {/* now here 3input box will go side by side */}
                    <input
                      type="text"
                      id="contact-name"
                      className="contact_form_name_input"
                      name="name"
                      value={user.name}
                      onChange={handleInputs}
                      placeholder="Your Name"
                      required={true}
                    />

                    <input
                      type="email"
                      id="contact-email"
                      className="contact_form_email_input"
                      name="email"
                      value={user.email}
                      onChange={handleInputs}
                      placeholder="Your Email"
                      required={true}
                    />

                    <input
                      type="number"
                      id="contact-phone"
                      className="contact_form_phone_input"
                      name="phone"
                      value={user.phone}
                      onChange={handleInputs}
                      placeholder="Your Phone Number"
                      required={true}
                    />
                  </div>

                  {/* text writing field */}

                  <div className="contact-me-form-text">
                    {/* has a text area */}
                    <textarea
                      className="contact-me-text-user mt-5"
                      name="message"
                      value={user.message}
                      onChange={handleInputs}
                      cols="30"
                      rows="10"
                      placeholder="Write something here"
                    ></textarea>
                  </div>

                  {/* a sbumit button goes here */}

                  <div className="submitButton">
                    <button
                      type="submit"
                      className="button primary submitBtn"
                      onClick={sendMessageData}
                    >
                      Send message
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
