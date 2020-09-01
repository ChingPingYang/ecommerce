const config = require('config');
const braintree = require('braintree');

const gateWay = braintree.connect({
    environment: braintree.Environment.Sandbox,
    merchantId: config.get('BRAINTREE_MERCHANT_ID'),
    publicKey: config.get('BRAINTREE_PUBLIC_KEY'), 
    privateKey: config.get('BRAINTREE_PRIVATE_KEY') 
})

exports.braintreeToken = async (req, res, next) => {
    try {
        const token = await gateWay.clientToken.generate({});
        req.braintreeToken = token.clientToken;
        next();
    } catch(err) {
        return res.status(401).json({ msg: 'Braintree failed'});
    }
}

exports.processPayment = async (req, res) => {
    let nonceFromClient = req.body.nonce;
    let amountFromClient = req.body.amount;
    try {
        let newTransaction = await gateWay.transaction.sale({
            amount: amountFromClient,
            paymentMethodNonce: nonceFromClient,
            options: { submitForSettlement: true }
        })
        return res.status(200).json(newTransaction);
    } catch(err) {
        return res.statue(500).json({ msg: err });
    }
}