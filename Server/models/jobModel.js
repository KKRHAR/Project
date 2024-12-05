const mongoose = require('mongoose');

const jobDetailSchema = new mongoose.Schema({
    Jobname: {
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
email:{
    type:String,
    required:true
},
location:{
    type:String,
    required:true,
},
experience:{
type:String,
defualt:"0 year"
},
category:{
    type:String,
    enum: ['Frontend', 'Backend','UI/UX Design','Database','Fullstack'],
    required:true
}

})
const jobDetail= mongoose.model('jobDetail', jobDetailSchema);
module.exports=jobDetail