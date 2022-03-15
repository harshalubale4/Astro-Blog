const mongoose = require('mongoose');

const contentSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    quote: {
        type: String
    },
    about: {
        type: String
    }
});

const Content = new mongoose.model("Content", contentSchema);
module.exports = Content;