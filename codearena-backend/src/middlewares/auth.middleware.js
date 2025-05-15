const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({message: 'Authorization header missing or invalid'});
    }

    const token = authHeader.split(' ')[1];

    try {
        req.user = jwt.verify(token, process.env.SECRET_KEY);
        next();
    } catch (err) {
        return res.status(403).json({message: 'Invalid or expired token'});
    }
};

module.exports = authMiddleware;
