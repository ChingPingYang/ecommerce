const express = require('express');
const router = express.Router();
const authToken = require('../../middleware/authToken');
const braintreeToken = require('../../middleware/braintreeToken');

router.get('/getToken', authToken, braintreeToken, async (req, res) => {
    
    res.json({ brainTreeToken: req.braintreeToken });
})

module.exports = router;