// const mongoose = require('mongoose');
// const Joi = require('joi');
// const bcrypt = require('bcryptjs');

// const UserSchema = new mongoose.Schema({
//     firstName: {
//         type: String,
//         required: true,
//         trim: true,
//         minlength: 3,
//         maxlength: 50
//     },
//     lastName: {
//         type: String,
//         required: true,
//         trim: true,
//         minlength: 3,
//         maxlength: 50
//     },
//     email: {
//         type: String,
//         required: true,
//         trim: true,
//         maxlength: 50,
//         unique: true,
//         match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address']
//     },
//     password: {
//         type: String,
//         required: true,
//         trim: true,
//         minlength: 5,
//         maxlength: 1024
//     },
// }, { timestamps: true });

// UserSchema.pre('save', async function (next) {
//     if (this.isModified('password')) {
//         const salt = await bcrypt.genSalt(10);
//         this.password = await bcrypt.hash(this.password, salt);
//     }
//     next();
// });

// function validateCreateUser(obj) {
//     const schema = Joi.object({
//         firstName: Joi.string().trim().min(3).max(50).required(),
//         lastName: Joi.string().trim().min(3).max(50).required(),
//         email: Joi.string().trim().max(50).required(),
//         password: Joi.string().trim().min(5).max(50).required(),
//     })
//     return schema.validate(obj)
// }

// const User = mongoose.model('User', UserSchema);
// module.exports = { User, validateCreateUser };

const mongoose = require('mongoose');
const Joi = require('joi');
const bcrypt = require('bcryptjs'); // ✅ You forgot this in the original snippet

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
        unique: true,
        match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address']
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 5,
        maxlength: 1024 // ✅ better to allow longer hashed password storage
    },
}, { timestamps: true });

// ✅ Automatically hash password before saving
UserSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
    }
    next();
});

// ✅ Joi validation schema for registering a user
function validateCreateUser(obj) {
    const schema = Joi.object({
        firstName: Joi.string().trim().min(3).max(50).required(),
        lastName: Joi.string().trim().min(3).max(50).required(),
        email: Joi.string().trim().email().max(50).required(),
        password: Joi.string().trim().min(5).max(50).required()
    });
    return schema.validate(obj);
}

const User = mongoose.model('User', UserSchema); // ✅ capitalized 'User' is conventional

module.exports = { User, validateCreateUser };
