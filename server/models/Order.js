const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "users",
        required: true
    },
    products: [
        {
            product: { type: Schema.Types.ObjectId, ref: "products", required: true },
            quantity: { type: Number, default: 1 }
        }
    ],
    transaction_id: {
        type: String
    },
    amount: {
        type: Number,
        required: true
    },
    address: {
        type: String,
        required: true
    }
}, { timestamps: true })

const Order = mongoose.model('orders', OrderSchema);

module.exports = Order;