const config = require('config');
const braintree = require('braintree');

const gateWay = braintree.connect({
    environment: braintree.Environment.Sandbox,
    merchantId: config.get('BRAINTREE_MERCHANT_ID'),
    publicKey: config.get('BRAINTREE_PUBLIC_KEY'), 
    privateKey: config.get('BRAINTREE_PRIVATE_KEY') 
})

const braintreeToken = async (req, res, next) => {
    try {
        const token = await gateWay.clientToken.generate({});
        req.braintreeToken = token.clientToken;
        next();
    } catch(err) {
        return res.status(401).json({ msg: 'Braintree failed'});
    }
}

module.exports = braintreeToken;