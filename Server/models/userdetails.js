const mongoose = require('mongoose');

const userDetailsSchema = new mongoose.Schema({
    usemail:{
        type:String,
        required:true,
    },
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
  
    DateofBirth: {
        type: Date, // Fixed typo here
        required: true,
    },
    PhoneNumber: {
        type: Number,
        required: true,
    },
    Gender: {
        type: String, // Added type
        enum: ['Male', 'Female'],
        required: true, // Added required if mandatory
    },
interest:{
type:String,
    enum: ['Frontend', 'Backend','UI/UX Design','Database','fullstack'],
    required:true

},   
    Cv: {
        type: String,
        required: true,
    },
});

const userDetails = mongoose.model('userDetails', userDetailsSchema);
module.exports = userDetails;
