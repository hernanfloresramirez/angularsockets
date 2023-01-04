//import multer from 'multer';
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './src/assets')
    },
    filename: function (req, file, cb) {
        cb(null, `${file.originalname}-${Date.now}`)
    }
})

const upload = multer({ storage })

module.exports = upload;