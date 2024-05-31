const jsonwebtoken = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {

    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
        const token = authHeader.split(' ')[1];

        if (!token) {
            res.status(401).json({ error: "Authorization token missing or invalid" });
        };

        try {

            const tokensData = jsonwebtoken.verify(token, process.env.JWT_SECRET);
            
        if ( tokensData.role && !['user', 'admin'].includes(tokensData.role)) {

            return res.status(403).json({ error: "Forbidden! Insufficient permissions" });
        }
            console.log('data inside token : ', tokensData);
            req.user = tokensData;
            next();
        } catch (error) {
            res.status(401).json({ error: 'Token invalid or expired' })
        }
    } else {
        next();
    }
}

module.exports = authMiddleware; 