const userModel = require("../models/userModels");
const jwt = require("jsonwebtoken");
require('dotenv').config();

// user login Auth
exports.authlogin = (req,res,next) =>{
    try{
        // front end request headers value check with  process env key 
        const decode = jwt.verify(req.headers.authorization,process.env.key);
         // if both values matches  put the decode value in the request
         req.user = decode;
         next();

    }catch(err){
        //if both values don't match
        console.log(err)
        res.status(400).send({message:"Please log in first"})

    }
}


// Admin Pannel 
exports.Admin = async (req,res,next) =>{
    try{
        // check req.user id in database 
       const user = await userModel.findById(req.user._id);
       if(user.role!= 1){
        return res.status(400).send({message:"unauthorized access"})
       }else{
        next();
       }

    }catch(err){
        console.log(err);
        return res.status(400).send({message:"unauthorized access"})

    }
}