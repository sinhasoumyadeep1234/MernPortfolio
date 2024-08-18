const dotenv=require('dotenv');
dotenv.config({path:'./.env'});
const path = require('path');
const express=require('express');
const app=express();
const PORT=process.env.PORT || 3000;
// require CORS(very important)
const cors = require('cors');
// import the mongodb connection file
require('./DB/conn');
const cookieParser = require('cookie-parser');


// app.use(cors());

const corsOptions = {
  origin: 'https://mern-portfolio-frontend-tau.vercel.app', // Your frontend's URL
  credentials: true, // Allow credentials (cookies, etc.) to be sent
};

app.use(cors(corsOptions));

// middleware to parse json
app.use(express.json());


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



app.listen(PORT,()=>{
    console.log(`server running at:http://localhost:${PORT}`);
})
