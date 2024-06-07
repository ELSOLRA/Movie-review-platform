const authService = require('../services/authService');

const registerUser = async (req, res) => {
    const { username, email, password, role } = req.body;

    try {
        const newUser = await authService.register(username, email, password, role);

        res.status(201).json({ success: true, message: `user ${username} registrated successfully`, token: newUser.token });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }

};

const loginUser = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await authService.login(username, password);

        res.status(200).json({ success: true, message: `${username} is now signed in as '${user.user.role}' `, token: user.token });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
}

const getUserInfo = async (req, res) => {
    try {
        const user = await authService.getUser(req.user.userId);
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = { registerUser, loginUser, getUserInfo }


