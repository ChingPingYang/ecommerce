const User = require('../models/User');

const isAdmin = async (req, res, next) => {
    const userId = req.userId;
    try {
        const user = await User.findById(userId).select('role');
        if(!user) return res.status(400).json({msg: 'User does not exist.'});
        if(user.role !== 1) return res.status(403).json({ msg: 'This user is not Admin.'});
        next()
    } catch(err) {
        return res.status(500).json({ msg: 'Server error...'});
    }
}

module.exports = isAdmin;