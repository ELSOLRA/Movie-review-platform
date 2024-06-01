const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({

    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        // e-mail validation (regex) and \S matches all non-space characters
        match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address.']  
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true,
        // standart role
        default: 'user',
        // only 'user' or 'admin' are valid roles
        enum: ['user', 'admin']
    },
    
    
});

userSchema.pre('save', async function(next){
    if(this.isModified('password')) {
        try {
            this.password = await bcrypt.hash(this.password, 10)
        } catch (error) {
            return next(error);
        };    
    };
    next();
})

const User = mongoose.model('User', userSchema);

module.exports = User; 
