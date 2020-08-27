const express = require('express');
const router = express.Router();
const authToken = require('../../middleware/authToken');
const braintreeToken = require('../../middleware/braintreeToken');

router.get('/getToken', authToken, braintreeToken, async (req, res) => {
    return res.status(200).json(req.braintreeToken);
})

module.exports = router;