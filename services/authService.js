const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

const authService = {

    register: async (username, email, password, role) => {
        try {

            const existingUser = await User.findOne({ $or: [{ email }, { username }] });
            if (existingUser) {
                throw new Error('Email or username already in use')
            };

            const newUser = await User.create({ username, email, password, role });
            const token = jwt.sign({ userId: newUser._id, role: newUser.role }, process.env.JWT_SECRET, { expiresIn: '30m' });
            return { user: { username, email, role }, token }

        } catch (error) {
            throw new Error(error.message);
        }
    },

    login: async (username, password) => {
        try {
            const user = await User.findOne({ username });
            console.log(' here user in authserv login: ', user);
            if (!user) {
                throw new Error('Invalid username');
            };

            const passwordMatch = await bcrypt.compare(password, user.password);
            if (!passwordMatch) {
                throw new Error('Invalid password');
            }
            const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '30m' })
            const userData = {
                username: user.username,
                email: user.email,
                role: user.role
            }
            return { user:  userData, token }

        } catch (error) {
            throw new Error(error.message);
        }
    },

    getUser: async (userId) => {
        try {
            const user = await User.findById(userId).select('-password -__v');
            if (!user) {
                throw new Error('User not found!');
            }
            return user
        } catch (error) {
            throw new Error(error.message);
        };
    } 
};


module.exports = authService; 