let mongoose = require('mongoose');

let articleSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    imagePath: {
        type: String,
        required: true
    }
});

let Article = module.exports = mongoose.model('Article', articleSchema);
