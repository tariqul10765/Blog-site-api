const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const createPostSchema = new Schema({
    author: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    img: {
        type: String
    },
    content: {
        type: String,
        
    },
    category: {
        type: String,
        
    },
    shortDes: {
        type: String
    },
    approved: {
        type: Boolean
    },
}, {
    timestamps: true
});

module.exports = mongoose.model('create-post', createPostSchema);