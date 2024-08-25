// to minimize the size of the app.js file we will put all the routes in this file using express router and remove the routes from the app.js file
const express = require("express");
// import router from 'express
const router = express.Router();
// import bcrypt for hashing
const bcrypt = require("bcrypt");
// for jwt(json web token) generation
const jwt = require("jsonwebtoken");

// add cookie parser
const cookieParser = require("cookie-parser");

// include the authentication middleware
const authenticate = require("../middleware/authenticate");

// include cookie parser
router.use(cookieParser());

// including the database so as to compare and also add the data
require("../DB/conn");
//including the userschema as new data has to be made into a collection and then enter into the database
const user = require("../Models/userDatabaseSchema");

// create the home path using router
router.get("/", (req, res) => {
  res.send("hello from the server using router");
});

// now lets create a dummmy route and send a post request from postman to this route to see if the data is being send in correct format or not

// using promises..can be done using async await too
router.post("/register", (req, res) => {
  //console.log("data recieved from postman", req.body);
  // sending back the data to the postman using json format
  // res.json({message:req.body});

  // now let us try to add the data from postman into the database

  // using destructuring we can take all the data out from the req.body
  const { name, email, phone, profession, password, cpassword } = req.body;

  // if user hasnt provided any one of the field then return error
  if (!name || !email || !phone || !profession || !password || !cpassword) {
    // ask user to fill all the detail fields we can test using postman and dont write any field then we can see this below error on the screen as response..we can also send status code error: client error starts from 400..we can use 422..as its clients error to not provide all the value
    return res.status(422).json({ error: "please enter all the fields" });
  }

  // now as it is a registration route..the name phone number must be unique as it is the first time registration and hence these values should not be present in the database already..hence using the userschema we will check if the data is already present or not

  // first email is the define email in the schema:second email is the email entered by the user...findOne returns promise thus handle using then
  user
    .findOne({ email: email })
    .then((userExists) => {
      // check if user exists then return error else inside catch block create a new collection and enter the data inserted by user
      if (userExists) {
        return res
          .status(422)
          .json({ error: "Email already exists!! please sign in to continue" });
      } else if (password != cpassword) {
        //   if password and confirm password doesnot matches then also show error else unmatched pair will get registered
        return res.status(422).json({ error: "Passwords do not match" });
      } else {
        // else create a new collection from the data entered by the user
        const newUser = new user({
          name,
          email,
          phone,
          profession,
          password,
          cpassword,
        });

        //   now before saving the the new user data we make sure that the password doesnot gets saved in plain text..rather in hash format and hence before saving the new user we will use a pre method to hash the password and then call the save method using a middleware function..this logic has to be written inside userschema.js

        // now we have to add this collection inside our database hence using save method..it again returns a promise hence we have to handle that too
        newUser
          .save()
          .then(() => {
            // user added successfully
            res.status(201).json({ message: "User registered successfully" });
          })
          .catch((err) => {
            // user addition failed due to any server error/database error
            res.status(500).json({ error: "User registration failed!!" });
          });
      }
      // now if the findone function didnot worked then we have to catch it as well
    })
    .catch((err) => {
      console.log(err);
    });

  // now lets test this bye sending some dummy data from postman and adding it into our online mongodb database..
});

// now making the signin/login route..this also can be done using promises and using async await..but we will use async await
router.post("/signin", async (req, res) => {
  try {
    // console.log(req.body);

    // now during login we will only get email and password
    const { email, password } = req.body;

    // now we will check if both the email and password are not empty
    if (!email || !password) {
      // return error to enter both the fields
      return res.status(422).json({ error: "Please enter both the fields" });
    }

    // else fetch using the provided data:case1: email already exists(then successful login). case2: email doesnot exist means it is a new user hence need to register

    const findUser = await user.findOne({ email: email });

    // now check findUser is not empty and the password is also same then it means user is already registered in that case show successfull login else show wrong credentials either email or password
    if (findUser) {
      // then check if the password entered by the user and the password stored in the database in hash format are same/different...for that bcrypt module has compare function..first pass is the password entered by user and returned in the findone var and second one is the password stored in the database to be compared with.
      const isSame = await bcrypt.compare(password, findUser.password);

      // we would also like to add a jwt token for the particular user and store in the cookie..so as to keep the user logged in for a particular amount of time..Now as we know finduser holds a document containing _id,name,email,phone,password and cpassword and hence we will generate a token associated with that user document and hence it would be great to create a schema method..hence when a document will get created we can also use its associated methods...thus in userSchema we have defined a schema method to generate a jwt token and store it in the cookie and also in the document of that particular user....thus calling this method like: Schemadocumentname.functionname()..thus we have to also define this generateAuthToken method inside the userDatabaseScehma.js file
      const token = await findUser.generateAuthToken();
      console.log("Token generated as: ", token);

      // no save the generated token in the cookie.first parameter is cookie name "jwt-token" can be any name..2nd param is the generated token and 3rd param is options..
      res.cookie("jwtoken", token, {
        // mention when the cookie should expire and hence the jwt token for a particular user in miliseconds..we want 30 days=25892000000ms..date.now gives the time user logins..+25892000000 adds 30 days time to it and finally new date converts it into a valid date..
        expires: new Date(Date.now() + 25892000000),
        // mark http only true..else it will only store if the connection is https(secure)
        httpOnly: true,
        secure: true,
        sameSite: 'None',
      });

      if (isSame) {
        return res.status(200).json({ message: "Login successful" });
      }
      return res.status(400).json({ error: "Invaid or wrong credentials" });
    } else {
      // No such credentials found with the email entered..may be it is a new email and hence prompt for signup/registration
      return res
        .status(400)
        .json({
          error:
            "No credentials found with the email entered..Consider signing up instead",
        });
    }
  } catch (error) {
    console.log(error);
  }
});

// now handle our about us page route..now we have to authenticate the user before showing the about page..thus we will use  a custom middleware function..defined in middleware folder file authenticate.js
router.get("/about", authenticate, (req, res) => {
  console.log("About us page visited");
  // send the root user in the req object as response..which will be captured by the about component fetch function
  // only send the required details
  const {_id,name,email,profession,phone}=req.findUser;
  // res.send(req.findUser);
  res.send({_id,name,email,profession,phone});
});

// getdata for contact us page and home page
router.get("/getData", authenticate, (req, res) => {
  // console.log("Contact us page visited");
  // send the root user in the req object as response..which will be captured by the about component fetch function
  // console.log("Data found as in /getData: ",req.findUser);
  res.send(req.findUser);
});


// contact us post request from frontend(change the method to get if give error)
router.post("/contact", authenticate, async (req, res) => {
  try {
    // get the data send from front end and present in the req.body
    const { name, email, phone, message } = req.body;

    if (!name || !email || !phone || !message) {
      // means in front end we havent filled all the fields of the contact form
      return res.status(400).json({ error: "Please fill all the fields of the contact form" })
    }

    // else find if the user is present in the database or not..as we know in authenticate method we already have pushed the user id in the req.userID and hence we can use it here
    const userFindContact = await user.findOne({ _id: req.userID });

    // if there is a user having the id
    if (userFindContact) {
      // add the message to this collection

      // add message function will be defined in the userschema file
      const userMessage = await userFindContact.addMessage(name,email,phone,message);

      // now save the collection
      await userFindContact.save();

      res.status(201).json({ message: "User message added successfully" });
    }else{
      res.status(404).json({error:"user not found"});
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: "Server error" });
  }
});


// logout route
router.get("/logout", (req, res) => {
  console.log("Logout triggered");
  // clear the saved cookie for a user which will automatically makes the user log out..
  res.clearCookie('jwtoken',{path:'/'})
  res.status(200).send("User logged out successfully"); 
});


// export the router to use it from app.js
module.exports = router;
