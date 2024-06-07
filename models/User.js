const mongoose = require('mongoose');
const hashedPassword = require('../utils/hashUtils')

const userSchema = new mongoose.Schema({

    username: {
        type: String,
        required: true,
        unique: true,
        minlength: [3, '`{PATH}` must be at least {MINLENGTH} characters long']
    },
    email: {
        type: String,
        required: true,
        unique: true,
// e-mail validation (regex) and \S matches all non-space characters
        match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address']
    },
    password: {
        type: String,
        required: true,
        minlength: [3, '`{PATH}` must be at least {MINLENGTH} characters long']
    },
    role: {
        type: String,
        required: true,
// standart role
        default: 'user',
// only 'user' or 'admin' are valid roles
        validate: {
            validator: function (role) {
                return role === 'user' || role === 'admin';
            },
            message: props => `${props.value} is not valid! It must be user either admin`
        }
    },
});

// middleware function to hash the password before saving 
userSchema.pre('save', async function (next) {
// checks if the password field has been modified
    if (this.isModified('password')) {
        try {
            this.password = await hashedPassword(this.password)
        } catch (error) {
            return next(error);
        };
    };
    next();
})

const User = mongoose.model('User', userSchema);

module.exports = User; 
