const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    about: {
        type: String
    },
    role: {
        type: Number,
        default: 0
    },
    history: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'products',
            required: true
        }
    ]
    ,
}, {timestamps: true})

const User = mongoose.model('users', UserSchema);

module.exports = User;