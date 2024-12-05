const userDetails= require('../models/userdetails')
const file= require('../imageUpload.js')
const jobDetail= require('../models/jobModel.js')
const asyncHandler = require('express-async-handler')
const employee= require('../models/Employee.js')
const { query } = require('express')


//upload details
const detail= asyncHandler(async(req,res,next)=>{
    console.log("i am controller",req.body)
    const yo= req.user;
    const ourUser= await employee.findById(yo).select("email")
    const user=await userDetails.find({usemail:ourUser}).select(" -usemail ")
    if(user.length >0)
    {
        console.log("this is running")
        return res.status(200).send(user)
    }
    console.log("this is not running")
    const imageUpload = req.file?.path
if(!imageUpload){
    res.status(400).json({message:"Image not found"})
}
    const {name,email,DateofBirth,PhoneNumber,Gender,interest}=req.body
    
    const image = await file.uploadOnCloudinary(imageUpload);
console.log(image.url)
const detail= await userDetails.create({
    name:name,
    PhoneNumber:PhoneNumber,
    email,
    DateofBirth,
    Gender,
    Cv:image.url,
    interest,
    usemail:ourUser,
    
})
res.status(200).send(detail)


})
const uploadJob = asyncHandler(async(req,res,next)=>{
const{Jobname,description,location,category,experience,email}=req.body 
const user=req.user

console.log(req.body);

if(!Jobname||!description){
    res.status(400).send('Name and description required');
    return;

}
const dvUser=await employee.findById(user)

const job= await jobDetail.create({Jobname,
    description,user,location,category,experience,email})

res.status(200).send(job);
})
const searchJob= asyncHandler(async(req,res,next)=>{
    const{location,title,category}=req.body
    const search={

    }
    if(location){
        search.location=location
    }
    if(title){
        search.name=title
    }
    if(category){
        search.category= category
    }
    const job= await jobDetail.find(search)
    res.status(200).send(job)
})
module.exports = {detail,uploadJob,searchJob};



