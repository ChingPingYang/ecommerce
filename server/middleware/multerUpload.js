const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads/'
        );
    },
    filename: function (req, file, cb) {
        cb(null, new Date().toISOString() + '_' + file.originalname)
    }
})
// To check if file is either jpg or png
const fileFilter = (req, file, cb) => {
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(new Error('Only accept JPG or PNG file.'), false);
    }
}

const upload = multer({ 
    storage: storage,
    limits: {
        // Only takes around 5mb
        fileSize: 1024 * 1024 * 5 
    },
    fileFilter
});

module.exports = upload;