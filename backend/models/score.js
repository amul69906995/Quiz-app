const mongoose = require('mongoose');
const scoreSchema = useState({
    owner:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    correctQuestion: {
        type: Number,
        required: true,
        trim: true,
    },
    incorrectQuestion: {
        type: Number,
        required: true,
        trim: true,
    },
    umattemptedQuestion:{
        type: Number,
        required: true,
        trim: true,
    }
   
})

module.exports = mongoose.model("Question", questionSchema)