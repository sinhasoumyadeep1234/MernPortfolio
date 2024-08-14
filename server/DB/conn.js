// mongo db connection code
const  mongoose  = require('mongoose');
const dotenv = require('dotenv');
const DB=process.env.DATABASE_CONNECTION_STRING;

mongoose.connect(DB).then(()=>{
    console.log('Database connection successfull');
}).catch((error)=>{
    console.log("No connection to the database found!");
})