const express = require('express');
const connectDB = require('./config/db');
const server = express();
const PORT = process.env.PORT || 8000;
const morgan = require('morgan');
const cookieParser = require('cookie-parser');

// @connect to DB
connectDB();

// @middleware
server.use(express.json({extends: false}));
server.use(morgan('dev'));
server.use(cookieParser());

// @routes
server.use('/api/user', require('./routes/api/user'));
server.use('/api/auth', require('./routes/api/auth'));
server.use('/api/category', require('./routes/api/category'));
server.use('/api/product', require('./routes/api/product'));
server.use('/api/braintree', require('./routes/api/braintree'));
server.use('/api/order', require('./routes/api/order'));

server.use(express.static('public'));

server.listen(PORT, () => {
    console.log(`server running at PORT_${PORT}...`)
}) ;