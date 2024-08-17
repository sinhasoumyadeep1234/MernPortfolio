const dotenv=require('dotenv');
const express=require('express');
const app=express();

// require CORS(very important)
const cors = require('cors');
app.use(cors());
// specifying the path of the .env file
dotenv.config({path:'./.env'});

const PORT=process.env.PORT || 3000;

// import the mongodb connection file
require('./DB/conn');
// import the database schema and collection
// const User=require('./Models/userDatabaseSchema');

// middleware to parse json
app.use(express.json());

// include the cors for all routes(very important)
// app.use(cors(
//     {
//         origin: ["https://mern-portfolio-frontend-tau.vercel.app"],
//         methods: ["POST", "GET"],
//         credentials: true
//     }
// ));



const cookieParser = require('cookie-parser');
app.use(cookieParser());


// import the router file using middleware as it uses router
app.use(require('./router/auth'));


// mew added lines

// Serve static files from the client/dist directory
app.use(express.static(path.join(__dirname, 'client', 'dist')));

// For any route that doesn’t match the API routes, serve index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
});

// new added lines ends here




// if(process.env.NODE_ENV === "production"){
//     app.use(express.static("client/dist"));
// }


app.listen(PORT,()=>{
    console.log(`server running at:http://localhost:${PORT}`);
})
