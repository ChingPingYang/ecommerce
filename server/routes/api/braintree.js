const express = require('express');
const router = express.Router();
const authToken = require('../../middleware/authToken');
const { braintreeToken, processPayment } = require('../../middleware/braintree');


router.get('/getToken', authToken, braintreeToken, async (req, res) => {
    return res.status(200).json(req.braintreeToken);
})

router.post('/payment', processPayment)

module.exports = router;