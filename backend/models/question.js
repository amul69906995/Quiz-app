const mongoose = require('mongoose');

const questionSchema = useState({
    owner:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    type: {
        type: String,
        required: true,
        trim: true,
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
            validate: [arrayLimit, '{PATH} exceeds the limit of 3'],
        }
})
const arrayLimit=(val)=>{
    return val.length === 3;
}
module.exports = mongoose.model("Question", questionSchema)