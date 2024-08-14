// creating schema for storing the user entered data to the database
const mongoose = require("mongoose");
// importing bcrypt for hashing the password
const bcrypt = require("bcrypt");
// using the jwt token generator package
const jwt = require("jsonwebtoken");

// creating the schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  profession: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  cpassword: {
    type: String,
    required: true,
  },
  date: {
    // now we will add date of the user when he/she creates a new account
    type: Date,
    default: Date.now,
  },
  messages: [
    // a messsage array will hold objects of messages of a user
    {
      name: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
      },
      phone: {
        type: Number,
        required: true,
      },
      message: {
        type: String,
        required: true,
      },
    },
  ],
  // now we should need another array of objects to store the jwt tokens generated for a user..as different logins will result different tokeks for a particular user..
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
});

// pre method(middleware function:to hash the password before save)
userSchema.pre("save", async function (next) {
  // now check if password is modified/added
  if (this.isModified("password")) {
    // then hash the password before saving..bcrypt.hash returns a promise hence making the function async to handle this easily using await
    this.password = await bcrypt.hash(this.password, 12);
    this.cpassword = await bcrypt.hash(this.cpassword, 12);
  }
  // then call the save method as next
  next();
});

// creating the generateAuthToken funtion associated with the userSchema..to generate the jwt token associated with each user document
userSchema.methods.generateAuthToken = async function () {
  try {
    // now we will generate the jwt token using a unique field..and we know in each document we have a _id field which will be always unique for each user document..Sign takes two argument..first one is the payload(we gave the object _id..this._id will be the current userdoc _id..and the second paramter is a key with which the hashing will be done to generate a jwt token hence we would like to keep the key secret in a .env file...thus _id+secret key=jwt token.)
    const Newtoken = jwt.sign({ _id: this._id }, process.env.SECRET_KEY);
    // now we will store the generated token in the token array
    this.tokens = this.tokens.concat({ token: Newtoken }); //this will create an object like this :{token:{151515151}} and then using concat()  method will add to the array tokens..of the particular user hence used this keyword final result will loook like: tokens:[{token:{151515151},},]

    // now after that save the document(after tokens has been added to the document..use this.save() as we want only the particular document to be saved..not the whole database
    await this.save();

    // then return the token generated to capture it where we called it/in our auth.js file
    return Newtoken;
  } catch (error) {
    console.log(error);
  }
};


// store the message in the message field: addMessage function
userSchema.methods.addMessage=async function(name,email,phone,message){
  try{
    console.log("Add message function is being called to add the message to the collection");
    // concat the message to its collection
    this.messages=this.messages.concat({name,email,phone,message});
    // save the collection
    await this.save();

    // return the messages
    return this.messages;

  }catch(e){
    console.log(e);
  }
}


// now we have to create the table/collection inside which we will store multiple about mentioned scehma documents..
const Main = mongoose.model("MAIN", userSchema);

// now this defined model will be used at many place to create collections hence we will export it

module.exports = Main;
