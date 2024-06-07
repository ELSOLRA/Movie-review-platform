const jsonwebtoken = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
// extracting the authorization header from the request
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
// extracting the token from the authorization header        
        const token = authHeader.split(' ')[1];

        if (!token) {
            res.status(401).json({ error: "Authorization token missing or invalid" });
        };

        try {

            const tokensData = jsonwebtoken.verify(token, process.env.JWT_SECRET);
// checking user role 
            if (tokensData.role && !['user', 'admin'].includes(tokensData.role)) {

                return res.status(403).json({ error: "Forbidden! Insufficient permissions" });
            }
// set the user data from the token to the req object
            req.user = tokensData;
            next();
        } catch (error) {
            res.status(401).json({ error: 'Token invalid or expired' })
        }
    } else {
        return res.status(401).json({ error: 'Authorization token missing or invalid' });
    }
};

module.exports = authMiddleware; 