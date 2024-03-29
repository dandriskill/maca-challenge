const multer = require('multer');

// Utilizes the 'multer' library to save files to disk (database storage not as performant).
const uploadFile = () => {
    const storage = multer.diskStorage({
        // Specify destination
        destination: function (req, file, cb) {
            cb(null, './files/');
        },
        // Specify file name (appends current date)
        filename: function (req, file, cb) {
            cb(null, Date.now() + '-' + file.originalname);
        }
    });

    return multer({ storage });
};

module.exports = {
    uploadFile,
};
