const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function(req, res, cb) {
        cb(
            null,
            path.join(
                path.dirname(process.mainModule.filename),
                'client',
                'public',
                'img'
            )
        );
    },
    filename: function(req, file, cb) {
        const path = file.originalname.replace(' ', '');
        cb(null, Date.now() + '-' + path);
    }
});

function fileFilter(req, file, cb) {
    if (file.mimetype.startsWith('image/')) {
        cb(null, true);
    } else {
        cb(new Error('Chỉ được đăng hình ảnh!'));
    }
}

module.exports = multer({ storage: storage, fileFilter: fileFilter });
