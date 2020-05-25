const mongoose = require('mongoose');
const config = require('config')


const connectDB = async () => {
    try {
        await mongoose.connect(config.get('db_URI'),{
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        })
        console.log('Connected to DB...')
    } catch(err) {
        console.log('DB error:', err)
    }
}

module.exports = connectDB;