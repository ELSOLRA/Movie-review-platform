const bcrypt = require('bcryptjs');

const hashedPassword = async(password) => {
    try {
        return await bcrypt.hash(password, 10);
    } catch (error) {
        throw new Error('Error hashing password');
    }
};

module.exports = hashedPassword;