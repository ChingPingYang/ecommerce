const User = require('../models/User');

const isAdmin = async (req, res, next) => {
    const userId = req.userId;
    try {
        const user = await User.findById(userId).select('role');
        if(user.role === 0) return res.status(403).json({ msg: 'This user is not Admin.'});
        next()
    } catch(err) {
        return res.status(500).json({ msg: 'Server error...'});
    }
}

module.exports = isAdmin;