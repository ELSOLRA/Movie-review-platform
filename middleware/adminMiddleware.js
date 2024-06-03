// RBAC 
const adminMiddleware = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        next();
    } else {
        return res.status(403).json({ error: "Forbidden! Admin role required" });
    }
}

module.exports = adminMiddleware;