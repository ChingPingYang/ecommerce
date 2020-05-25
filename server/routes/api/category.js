const express = require('express');
const router = express.Router();
const authToken = require('../../middleware/authToken');
const isAdmin = require('../../middleware/isAdmin');
const { check, validationResult } = require('express-validator');
const Category = require('../../models/Category');


// @route   POST api/category
// @desc    For admin to add new category
// @access  Private
router.post('/',[ 
    authToken, 
    isAdmin, 
    check('name', 'Category name is required.').not().isEmpty()
 ], async (req, res) => {
    const firstCheck = validationResult(req);
    if(!firstCheck.isEmpty()) return res.status(400).json({ msg: firstCheck.array()[0].msg });
    try {
        const newCategory = new Category({
            name: req.body.name
        });
        await newCategory.save();
        return res.status(200).json(newCategory);
    } catch(err) {
        return res.status(500).json({ msg: 'Server error...'});
    }
})

// @route   GET api/category
// @desc    Get all category
// @access  Public
router.get('/', async (req, res) => {
    try {
        const categories = await Category.find().sort({ createdAt: -1});
        if(categories.length < 1) return res.status(404).json({ msg: 'No category avalible.'});
        return res.status(200).json(categories);
    } catch(err) {
        return res.status(500).json({ msg: 'Server error...'});
    }
})


// @route   GET api/category
// @desc    Get certain category
// @access  Public
router.get('/:categoryId', async (req, res) => {
    const categoryId = req.params.categoryId;
    try {
        const category = await Category.findById(categoryId);
        if(!category) return res.status(404).json({ msg: 'The category does not exist'});
        return res.status(200).json(category);
    } catch(err){
        if(err.kind === undefined) {
            return res.status(400).json({ msg: 'Not valid category ID'});
        } else {
            return res.status(500).json({ msg: 'Server error...'});
        }
    }
})

// @route   PUT api/category
// @desc    Update certain category
// @access  Private
router.put('/:categoryId', [
    authToken, 
    isAdmin,
    check('name', 'Category name is required.').not().isEmpty()
], async (req, res) => {
    const firstCheck = validationResult(req);
    if(!firstCheck.isEmpty()) return res.status(400).json({ msg: firstCheck.array()[0].msg});
    const categoryId = req.params.categoryId;
    try {
        const category = await Category.findOneAndUpdate(
            {_id: categoryId},
            {$set: { name: req.body.name }},
            {new: true}
        )
        if(!category) return res.status(400).json({ msg: 'Category does not exist.'});
        return res.status(200).json(category);
    } catch(err) {
        if(err.kind === undefined) {
            return res.status(400).json({ msg: 'Not valid category ID'});
        } else {
            return res.status(500).json({ msg: 'Server error...'});
        }
    }
})

// @route   DELETE api/category
// @desc    Delete certain category
// @access  Private
router.delete('/:categoryId', [ authToken, isAdmin ], async (req, res) => {
    const categoryId = req.params.categoryId;
    try {
        const category = await Category.findById(categoryId);
        if(!category) return res.status(400).json({ msg: 'Category does not exist.'});
        await category.remove();
        return res.status(200).json({ msg: 'Category was removed.'});
    } catch(err) {
        if(err.kind === undefined) {
            return res.status(400).json({ msg: 'Not valid category ID'});
        } else {
            return res.status(500).json({ msg: 'Server error...'});
        }
    }
})


module.exports = router;