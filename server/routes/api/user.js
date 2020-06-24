const express = require('express');
const router = express.Router();
const User = require('../../models/User');
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('config');
const authToken = require('../../middleware/authToken');

// @route  POST api/user
// @desc   Register user & give token
// @access Public
router.post('/',[
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Email is required').not().isEmpty()
        .isEmail().withMessage('Must be an e-mail.'),
    check('password', 'Password is required').not().isEmpty()
        .isLength({ min: 6 }).withMessage('Password has to be at least 6 characters.')
],async (req, res) => {
    let firstCheck = validationResult(req);
    if(!firstCheck.isEmpty()) return res.status(400).json({ msg: firstCheck.array()[0].msg});
    const {name, email, password, role} = req.body;
    try{
        // Checking if the email has been used.
        let checkEmail = await User.findOne({ email });
        if(checkEmail) return res.status(400).json({ msg: 'E-mail has been used... please try another one.'});

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new user
        const newUser = new User({
            name,
            email,
            password: hashedPassword,
        })
        if(role) newUser.role = role;
        await newUser.save();
        
        // Create token
        const payload = {
            _id: newUser._id
        }
        const token = jwt.sign(payload,config.get('JWT_SECRET'));
        
        return res.status(200).json(token);
    } catch(err) {
        return res.status(500).json({ msg: 'server error...'});
    }
})

// @route  GET api/user
// @desc   Get all users
// @access Public
router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        if(!users) return res.status(404).json({ msg: 'Currently no user.'});
        return res.status(200).json(users);
    } catch(err) {
        return res.status(500).json({ msg: 'Server error...'});
    }
})

// @route  PUT api/user
// @desc   Update user profile
// @access Private


// @route  DELETE api/user
// @desc   Delete certain user
// @access Private
router.delete('/:id', authToken, async (req, res) => {
    const userId = req.userId;
    const removerId = req.params.id;
    try {
        const user = await User.findById(userId);
        if(user._id.toString() !== removerId) return res.status(400).json({ msg: 'Only the user can delete himslef'});
        await user.remove()
        return res.status(200).json({ msg: 'User is removed.'});
    } catch(err) {
        return res.status(500).json({ msg: 'server error...'});
    }
})
module.exports = router;