const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const JWT = require('jsonwebtoken')
const dotenv=require("dotenv")
dotenv.config({ path: './.env' })
const EmployeeSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },

    email:String,
    password:String
})
EmployeeSchema.pre('save',async function(next){
if(!this.isModified("password")) return next();
this.password = await bcrypt.hash(this.password,10)
next();
})
EmployeeSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password,this.password)
}
EmployeeSchema.methods.generateaccesstoken = function(){
    return JWT.sign({
        _id:this._id,
        email:this.email,
        fullname:this.name,
    },
      "123445678!@",

)
}
EmployeeSchema.methods.refreshToken = function(){
    return JWT.sign({
        _id:this._id,
    },  "yoyohonysing",
    
)
}


const EmployeeModel= mongoose.model('employees',EmployeeSchema)
module.exports=EmployeeModel