const asynchandler=require('express-async-handler')
const jwt=require("jsonwebtoken")
const Employee=require("../models/Employee.js")
  const verifyJWt=asynchandler(async(req,res,next)=>{

     
    try {
        console.log("i am cookie",req.cookies)
        const token=req.cookies?.accessToken ||
        req.header("Authorization")?.replace("Bearer ", ""); 
        if(!token){
            res.status(401).send("token not available");
        }
        const decodeToken=jwt.verify(token,"123445678!@")
        const userdb= await Employee.findById(decodeToken?._id).select("_id");
        if(!userdb){
            return res.status(401).send("user not found")
        }
        req.user=userdb
        
next()
    } catch (error) {
        console.log(error);
        
        console.log("error while decoding the token");
    }


})
module.exports=verifyJWt