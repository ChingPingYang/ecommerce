const jwt = require('jsonwebtoken');
const config = require('config');

const authToken = (req, res, next) => {
    const token = req.header('auth-token');
    if(!token) return res.status(403).json({ msg: 'No token provided...' });
    
    try {
        const decoded =  jwt.verify(token, config.get('JWT_SECRET'));
        req.userId = decoded._id;
        next()
    } catch(err) {
        if(err) return res.status(403);
    }
}

module.exports = authToken;