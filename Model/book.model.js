const mongoose = require('mongoose');
const ObjectId = require('mongoose').ObjectId;

var BookSchema = new mongoose.Schema({
    author: ObjectId,
    name: {
        type: String,
        required: 'This field is required.'
    },
    email: {
        type: String,
    },
    price: {
        type:Number,
        required: 'This field is required.'
    },
    quantity: Number,
});

// Custom validation for email
BookSchema.path('email').validate((val) => {
    emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(val);
}, 'Invalid e-mail.');

mongoose.model('bookstore', BookSchema);