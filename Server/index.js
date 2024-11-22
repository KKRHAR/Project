const express = require('express');
const mongoose = require('mongoose');
const cors = require("cors")
const EmployeeModel= require('./models/Employee')

const userdetail= require('./router/userDetails.routes');
const userDetails = require('./models/userdetails');
const app = express()
app.use(express.json())
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
  }));
mongoose.connect('mongodb://127.0.0.1:27017/employee')      

// app.get('/',(req,res)=>{
// res.send("OK oh yeh dhoom machale")
// })
app.use('/',userdetail)
app.post('/register',async(req,res)=>{
console.log(req.body)
const dv= await EmployeeModel.create(req.body)

console.log(dv);
res.status(200).json(dv)
// .then(employees => res.json(employees))
// .catch(err=> res.json(err))
})
app.post('/login',async(req,res)=>{
   const {email,password}=req.body
if(!email||!password){
    res.status(400).send('email or password required');
    return;

}console.log(email,password)
const user = await EmployeeModel.findOne({email:email})
// console.log(user)
if(!user){
    res.status(400).send('Your are not registered');
    return;
}
res.status(200).send("User found");

})


app.listen(3001,()=>{
    console.log("server is running")
})