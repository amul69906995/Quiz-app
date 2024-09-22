const mongoose = require('mongoose');
const scoreSchema =new mongoose.Schema({
    owner:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    correctQuestion: {
        type: Number,
        required: true,
        trim: true,
    },
    attemptedQuestion: {
        type: Number,
        required: true,
        trim: true,
    },
    unattemptedQuestion:{
        type: Number,
        required: true,
        trim: true,
    }
  
},{
    timestamps: true
});

module.exports = mongoose.model("Score", scoreSchema)