const { getAllFiles, uploadFile, retrieveFile } = require('../controllers/files');

const router = require('express').Router({ mergeParams: true });

router.route('/')
    // Get metadata of all files
    .get(async (req, res, next) => {
        try {
            const result = await getAllFiles(req.body);
            res.status(200).json({
                status: 'success',
                data: result,
            });
        } catch (error) {
            console.error(error);
            res.status(500).send(error);
        }
    })
    // Upload a file
    .post(async (req, res, next) => {
        try {
            const result = await uploadFile(req.body);
            res.status(200).json({
                status: 'success',
                data: result,
            });
        } catch (error) {
            console.error(error);
            res.status(500).send(error);
        }
    });

router.route('/file')
    // Retrieve a file
    .get(async (req, res, next) => {
        try {
            const result = await retrieveFile(req.body);
            res.status(200).json({
                status: 'success',
                data: result,
            });
        } catch (error) {
            console.error(error);
            res.status(500).send(error);
        }
    });

module.exports = router;