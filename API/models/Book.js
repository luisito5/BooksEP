const mongoose = require('mongoose');
const User = require('./User');

const BookSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: Number,
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId, ref: 'User'
    }
});

module.exports = mongoose.model('Book', BookSchema);