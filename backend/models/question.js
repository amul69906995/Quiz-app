const mongoose = require('mongoose');
const User=require('./user.js')

const questionSchema =new mongoose.Schema({
    owner:{
        type: mongoose.Schema.Types.ObjectId,
        ref:User,
        required:true,
    },
    difficulty: {
        type: String,
        required: true,
        trim: true,
    },
    category: {
        type: String,
        required: true,
        trim: true,
    },
    question: {
        type: String,
        required: true,
        trim: true,
    },
    correct_answer: {
        type: String,
        required: true,
        trim: true,
    },
    incorrect_answers: 
        {
            type: [String],
            required: true,
            trim:true,
      }
})

module.exports = mongoose.model("Question", questionSchema)