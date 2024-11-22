const mongoose = require('mongoose');

const jobDetailSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
description:{
    type:String,
    required:true,
},
user:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "userDetails"
    
},
location:{
    type:String,
    required:true,
},
category:{
    type:String,
    enum: ['Frontend', 'Backend','UI/UX Design','Database','fullstack'],
    required:true
}

})
const jobDetail= mongoose.model('jobDetail', jobDetailSchema);
module.exports=jobDetail