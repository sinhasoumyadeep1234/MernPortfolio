// import jwt token
const jwt=require('jsonwebtoken');

// import the userSchema
const user = require("../Models/userDatabaseSchema");

// define the middleware
const authenticate = async(req,res,next)=>{
    try{
        // get the token stored in the req param
        const token=req.cookies.jwtoken;

        if(!token){
            throw new Error("No token provided");
        }

        // now compare the got from the req.body and the secret key used to generate the token with the verify function
        const VerifyToken=jwt.verify(token,process.env.SECRET_KEY);

        // now get the user from the database having this token in the token field of the user...if id matches and the associated tokens.token contains the token got from the request body then return the user collection
        const findUser=await user.findOne({_id:VerifyToken._id,"tokens.token":token});

        // if no user found the throw error
        if(!findUser){throw new Error("User not found")}

        // else replace the token in the req.token with the token
        req.token=token;

        // adding the whole collection of that user in the req object
        req.findUser=findUser;

        // now extract the id as userid from the findUser collection..as the id is unique later we can use this to extract the corresponding collection
        req.userID=findUser._id;

        // then call the next method

        next();



    }catch(err){
        res.status(401).send('Unauthorized : No token provided');
        console.log(err);
    }
}

// export the middleware
module.exports = authenticate;