
const mongoose = require('mongoose')
const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    author: {
        type: String,
        required: true,
        trim: true
    },
    publishYear: {
        type: Number,
        required: true,
        min: 0
    },
    price: {
        type: Number,
        required: true,
        trim:true,
        min: [0, 'price must be greater than 0']
    },
    genre: {
        type: String,
        trim: true,
        default: ''
    },

},{
    timestamps: true,
})

const Book = mongoose.model('Book', bookSchema);
module.exports = Book;