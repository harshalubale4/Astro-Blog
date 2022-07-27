const mongoose = require('mongoose');

const ImageSchema = new mongoose.Schema({
    url: String,
    filename: String
})

var today = new Date();
var date = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();

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
    },
    images: [ImageSchema],
    contentDate: {
        type: String,
        default: date,
    },
});


ImageSchema.set('toJSON', { virtuals: true })

ImageSchema.virtual('optimized').get(function () {
    return (this.url.replace('/upload', '/upload/c_fill'));
})
const Content = new mongoose.model("Content", contentSchema);
module.exports = Content;