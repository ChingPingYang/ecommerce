const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'categories',
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    sold: {
        type: Number,
        default: 0
    },
    imageURL: {
        type: String,
        required: true
    }

}, {timestamps: true})

const Product = mongoose.model('products', ProductSchema);

module.exports = Product;