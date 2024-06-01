const authService = require('../services/authService')

const registerUser = async (req, res) => {
    const { username, email, password, role } = req.body;
    
    try {
        const newUser = await authService.register(username, email, password, role);

        res.status(201).json({ succes: true, message: `user ${username} registrated successfully`, token: newUser.token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }

};

module.exports = {registerUser} 


