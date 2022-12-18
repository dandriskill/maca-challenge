const multer = require('multer');

// TODO: Mock multer and write unit tests to confirm returned object's shape
// Utilizes the 'multer' library to save files to disk (database storage not as performant).
const uploadFile = () => {
    const storage = multer.diskStorage({
        // Specify destination
        destination: function (req, file, cb) {
            cb(null, './files/');
        },
        // Specify file name (appends current date)
        filename: function (req, file, cb) {
            cb(null, file.fieldname + '-' + Date.now());
        }
    });

    return multer({ storage: storage });
};

module.exports = {
    uploadFile,
};
