const express = require('express');
const router = express.Router();
const fs = require('fs');
const authToken = require('../../middleware/authToken');
const isAdmin = require('../../middleware/isAdmin');
const Product = require('../../models/Product');
const multerUpload = require('../../middleware/multerUpload');


// @route   POST api/product
// @desc    For admin to add new product
// @access  Private
router.post('/', [ authToken, isAdmin ], (req, res) => multerUpload.single('imageURL')(req, res, async (err) => {
        // Handle errors for multer first*
        if(err) {
            if(err.message) return res.status(400).json({ msg: err.message});
        }
        // Check request body
        const { name, description, category, price, quantity, sold } = req.body;
        if(!name) {
            return res.status(400).json({ msg: 'Name is required.'});
        } else if(!category) {
            return res.status(400).json({ msg: 'Category is required.'});
        } else if(!price) {
            return res.status(400).json({ msg: 'Price is required.'});
        } else if(!quantity){
            return res.status(400).json({ msg: 'Quantity is required.'});
        } else if(!req.file) {
            return res.status(400).json({ msg: 'Image is required.'});
        }
        
        try{
            const newProduct = new Product({
                name,
                description,
                category,
                price,
                quantity,
                sold,
                imageURL: req.file.path.slice(6)
            })
            await newProduct.save();
            return res.json(newProduct);
        } catch(err) {
            console.log(err)
            return res.status(500).json({ msg: 'Server error...'});
        }
        
}))

// @route   PUT api/product
// @desc    For admin to update old product
// @access  Private
router.put('/:productId', [ authToken, isAdmin ], (req, res) => multerUpload.single('imageURL')(req, res, async (err) => {
    const productId = req.params.productId;
    const { name, description, category, price, quantity, sold } = req.body;
    const file = req.file;
    
    // Handle errors for multer
    if(err) {
        if(err.message) return res.status(400).json({ msg: err.message});
        return res.status(400).json({ msg: 'Only accept JPG or PNG file.'});
    }
    // Create new object to handle new info
    const updateProduct = {};
    if(name) updateProduct.name = name;
    if(description) updateProduct.description = description;
    if(category) updateProduct.category = category;
    if(price) updateProduct.price = price;
    if(quantity) updateProduct.quantity = quantity;
    if(sold) updateProduct.sold = sold;
    if(file) updateProduct.imageURL = file.path.slice(6);
    
    try {
        // Checking if the product exist
        let product = await Product.findById(productId);
        if(!product) return res.status(404).json({ msg: 'This product does not exist.'});
        // If the admin provides new picture, delete the old picture in the disk
        if(file) {
            fs.unlink(`public${product.imageURL}`, (err) => {
                if(err) return res.status(400).json({ msg: 'There\'s a problem of deleting the image of the old product...'});
            })
        }
        // Update product with new info
        product = await Product.findOneAndUpdate(
            { _id: productId },
            { $set: updateProduct },
            { new: true }
        )
        return res.status(200).json(product)
    } catch(err){
        return res.status(500).json({ msg: 'Server error...'});
    }
}))


// @route   GET api/product
// @desc    Get all products 
// @access  Public
router.get('/', async(req, res) => {
    // Sort products with query params
    // a) ?sortBy=sold&order=desc&limit=4;
    // b) ?sortBy=createdAt&order=desc&limit=4;
    const sortBy = req.query.sortBy? req.query.sortBy : "_id";
    const order = req.query.order? req.query.order : 'desc';
    const limit = req.query.limit? Number(req.query.limit) : 6;
    try {
        const products = await Product.find().populate('category', ['name']).sort({ [sortBy]: order}).limit(limit);
        if(products.length < 1) return res.status(404).json({ msg: 'There\' no products avalible.'});
        return res.status(200).json(products);
    } catch(err) {
        return res.status(500).json({ msg: 'Server error...'});
    }
})

// @route   POST api/product/search
// @desc    Get products according to the search fields
// @access  Public
router.post('/search', async (req, res) => {
    // Create filter object first in case of not passing anything in req.body
    let filter = {};   
    console.log('HEADER: ',req.headers) 
    // if(req.body.filter) filter = req.body.filter;
    if(req.body.filter) {
        const { price, category } = req.body.filter;
        filter = {
            price: {
                $gte: price.start,
                $lte: price.end
            },
            category: {
                $in: [...category]   
            }
        }
        // if searching text is provided, assign it the the filter.
        if(req.body.filter.search.length > 0) filter.$text = {$search: req.body.filter.search};
    }
    // $text: {$search: "javascript react book"}
    const sortBy = req.query.sortBy? req.query.sortBy : '_id';
    const order = req.query.order? req.query.order : 'asc';
    const limit = req.query.limit? Number(req.query.limit) : 3;
    const skip = req.query.skip? Number(req.query.skip) : 0;
    try {
        const products = await Product.find(filter).populate('category', ['name']).sort({ [sortBy]: order} ).limit(limit).skip(skip);
        const count = await Product.find(filter).populate('category', ['name']).countDocuments();
        if(!products) return res.status(400).json({ msg: 'No products are found.'});
        return res.status(200).json({products, documentCount: count});
    } catch(err) {
        return res.status(500).json({ msg: 'Server error...'});
    }
})

// @route   GET api/product/categories
// @desc    Get categories that are used in Product
// @access  Public
router.get('/categories', async (req, res) => {
    try {
        const categories = await Product.distinct('category', {});
        if(!categories) return res.status(404).json({ msg: 'No categories are found.'});
        return res.status(200).json(categories);
    } catch(err) {
        return res.status(500).json({ msg: 'Server error...'});
    }
})

// @route   Get api/product/:productId
// @desc    Get one product by id
// @access  Public
router.get('/:productId', async (req, res) => {
    const productId = req.params.productId;
    try {
        const product = await Product.findById(productId).populate('category', ['name']);
        if(!product) return res.status(404).json({ msg: 'This product does not exist.'});
        return res.json(product);
    } catch(err){
        if(err.kind === undefined) {
            return res.status(400).json({ msg: 'Not valid product ID'});
        } else {
            return res.status(500).json({ msg: 'Server error...'});
        }
    }
}) 

// @route   Get api/product/related/:productId
// @desc    Get products which are related to the given productId
// @access  Public
router.get('/related/:productId', async (req, res) => {
    const productId = req.params.productId;
    const limit = req.query.limit? Number(req.query.limit) : 6;
    try {
        const product = await Product.findById(productId);
        const products = await Product.find({ _id: {$ne: productId}, category: product.category}).populate('category', ['name']).limit(limit);
        if(!products) return res.status(400).json({ msg: 'No related products.'});
        return res.status(200).json(products);
    } catch(err) {
        if(err.kind === undefined) {
            return res.status(400).json({ msg: 'Not valid product ID'});
        } else {
            return res.status(500).json({ msg: 'Server error...'});
        }
    }
})


// @route   DELETE api/product/:productId
// @desc    Delete one product by id, also delete it's image from the disk storage
// @access  Private
router.delete('/:productId', [ authToken, isAdmin ], async (req, res) => {
    const productId = req.params.productId;
    try {
        const product = await Product.findById(productId);
        if(!product) return res.status(404).json({ msg: 'This product does not exist.'});
        // Delete the image first
        fs.unlink(`public${product.imageURL}`, async (err) => {
            if(err) return res.status(400).json({ msg: 'There\'s a problem of deleting the image for this product...'});
            // Then delete the document
            await product.remove();
            return res.json({ msg: 'Product removed.'});
        })
    } catch(err) {
        if(err.kind === undefined) {
            return res.status(400).json({ msg: 'Not valid product ID'});
        } else {
            return res.status(500).json({ msg: 'Server error...'});
        }
    }
})


module.exports = router;