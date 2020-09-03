const express = require('express');
const router = express.Router();
const authToken = require('../../middleware/authToken');
const { braintreeToken, processPayment } = require('../../middleware/braintree');

// @route   GET api/braintree/getToken
// @desc    Get braintree token for payment
// @access  Private
router.get('/getToken', authToken, braintreeToken, async (req, res) => {
    return res.status(200).json(req.braintreeToken);
})


// @route   POST api/braintree/payment
// @desc    Proceed payment
// @access  Private
router.post('/payment', authToken,processPayment)

module.exports = router;