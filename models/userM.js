const mongoose = require('mongoose');
const Joi = require('joi');

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 50
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 50
    },
    email: {
        type: String,
        required: true,
        trim: true,
        maxlength: 50,
        match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address']
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 5,
        maxlength: 50
    },
}, { timestamps: true });

function validateCreateUser(obj) {
    const schema = Joi.object({
        firstName: Joi.string().trim().min(3).max(50).required(),
        lastName: Joi.string().trim().min(3).max(50).required(),
        email: Joi.string().trim().max(50).required(),
        password: Joi.string().trim().min(5).max(50).required(),
    })
    return schema.validate(obj)
}

const User = mongoose.model('user', UserSchema);
module.exports = { User, validateCreateUser };