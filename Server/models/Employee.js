const mongoose = require('mongoose')

const EmployeeSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },

    email:String,
    password:String
})

const EmployeeModel= mongoose.model('employees',EmployeeSchema)
module.exports=EmployeeModel