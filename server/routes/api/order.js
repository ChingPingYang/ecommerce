const express = require('express');
const router = express.Router();
const authToken = require('../../middleware/authToken');
const { check, validationResult } = require('express-validator');

router.post('/', [
    authToken,
    check('amout', 'No amount provided').not().isEmpty(),
    check('address', 'No address provided').not().isEmpty(),
], async (req, res) => {
    const firstCheck = validationResult(req);
    if(!firstCheck.isEmpty()) return res.status(400).json({ msg: firstCheck.array()[0].msg });
    const userId = req.userId;
    
})