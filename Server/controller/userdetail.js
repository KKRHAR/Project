const userDetails= require('../models/userdetails')
const file= require('../imageUpload.js')
const jobDetail= require('../models/jobModel.js')
const asyncHandler = require('express-async-handler')
const employee= require('../models/Employee.js')
const { query } = require('express')


const detail= asyncHandler(async(req,res,next)=>{
    console.log('detail',req.body);
    const imageUpload = req.file?.path
if(!imageUpload){
    res.status(400).json({message:"Image not found"})
}
    const {name,email,DateofBirth,PhoneNumber,Gender,interest}=req.body
    console.log(req.body) 
    const image = await file.uploadOnCloudinary(imageUpload);
console.log(image.url)
const detail= await userDetails.create({
    name:name,
    PhoneNumber:PhoneNumber,
    email,
    DateofBirth,
    Gender,
    Cv:image.url,
    interest
    
})
console.log(detail)
res.status(200).send(detail)


})
const uploadJob = asyncHandler(async(req,res,next)=>{
const{name,description,user,location,category}=req.body 
console.log(req.body)

if(!name||!description){
    res.status(400).send('Name and description required');
    return;

}
const dvUser=await employee.findById({_id:user
})
console.log(dvUser)
const job= await jobDetail.create({name,
    description,user,location,category})

res.send(job);
})
const searchJob= asyncHandler(async(req,res,next)=>{
    console.log(req.body)
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



