const express = require('express');
const router = express.Router();
const authToken = require('../../middleware/authToken');
const { check, validationResult } = require('express-validator');
const Order = require('../../models/Order');
const Product = require('../../models/Product');


// @route   POST api/order
// @desc    Create new order from cart. Also change quantity and sold for products
// @access  Private
router.post('/', [
    authToken,
    check('amount', 'No amount provided').not().isEmpty(),
    check('address', 'No address provided').not().isEmpty(),
], async (req, res) => {
    const firstCheck = validationResult(req);
    if(!firstCheck.isEmpty()) return res.status(400).json({ msg: firstCheck.array()[0].msg });
    const userId = req.userId;
    console.log(req.body)
    try {
        // Create new order in DB
        const newOrder = new Order({
            ...req.body,
            user: userId
        })
        await newOrder.save();

        // Change quantity and sold for products
        req.body.products.map( async item => {
            const product = await Product.findById(item.product);
            product.quantity -= item.quantity;
            product.sold += item.quantity;
            console.log('NEW: ', product);
            await product.save();
        })

        return res.status(200).json(newOrder);
    } catch(err) {
        console.log(err)
        return res.status(500).json({ msg: `Server error... ${err}`});
    }
})

// @route   GET api/order
// @desc    Get orders based on userId and sorting
// @access  Private
router.get('/', authToken , async (req, res) => {
    const userId = req.userId;
    const sortBy = req.query.sortBy? req.query.sortBy : 'createdAt'; 
    const order = req.query.order? req.query.order : 'desc'; 
    try {
        const orders = await Order.find({ user: userId }).populate('products.product', ['name', 'price']).sort({ [sortBy]: order });
        return res.status(200).json(orders);
    } catch(err) {
        return res.status(500).json({ msg: err });
    }
})

module.exports = router;