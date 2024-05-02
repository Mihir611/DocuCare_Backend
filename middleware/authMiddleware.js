const jwt = require('jsonwebtoken');
const env = require("../env")

exports.authenticateToken = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({message: 'No token provided'});
    }

    jwt.verify(token, env.TOKEN_KEY, (err, decoded) => {
        if (err) {
            return res.status(403).json({message: 'Failed to authenticate token'});
        }
        req.userId = decoded.userId;
        next();
    });
}