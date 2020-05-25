const express = require('express');
const router = express.Router();
const User = require('../../models/User');
const authToken = require('../../middleware/authToken');
const isAdmin = require('../../middleware/isAdmin');
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('config');

// @route   GET api/auth
// @desc    get authenticated user's data after login
// @access  Private
router.get('/', authToken, async (req, res) => {
    const _id = req.userId;
    try {
        const user = await User.findById(_id).select('-password');
        return res.status(200).json(user)
    } catch(err) {
        return res.status(500).json({ msg: 'server error...'});
    }
})

// @route   POST api/auth
// @desc    Authenticate user & get token = Log in
// @access  Public
router.post('/', [
    check('email', 'Email is required.').not().isEmpty().isEmail().withMessage('Has to be an email.'),
    check('password', 'Password is required.').not().isEmpty().isLength({min: 6}).withMessage('Has to been longer than 6 characters.')
], async (req, res) => {
    const firstCheck = validationResult(req);
    if(!firstCheck.isEmpty()) return res.status(400).json({ msg: firstCheck.array()[0].msg});
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        // Check if user existed
        if(!user) return res.status(400).json({ msg: 'User does not exist.'});
        // Check if the password is correct
        const samePassword = await bcrypt.compare(password, user.password);
        if(!samePassword) return res.status(400).json({ msg: 'Password is incorrect'});
        // Create token and send back to the client
        const token = jwt.sign({
            _id: user._id
        }, config.get('JWT_SECRET'),);
        return res.status(200).json(token);
    } catch(err) {
        return res.status(500).json({msg: 'Server error'});
    }
})


module.exports = router