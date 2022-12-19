const router = require('express').Router({ mergeParams: true });
const { getAllFiles, saveMetadata, getInsights, downloadFile } = require('../controllers/files');
const { uploadFile } = require('../middleware/files');

// All account-based CRUD routes would eventually have an account scope modifier, but not for the purposes of this challenge
router.route('/')
    // Get all files (metadata)
    .get(async (req, res, next) => {
        try {
            const result = await getAllFiles();
            res.status(200).json({
                status: 'success',
                data: result,
            });
        } catch (error) {
            console.error(error);
            res.status(500).send(error);
        }
    })
    // Upload a file to disk storage, save metadata to the database
    .post(uploadFile.single('file'), async (req, res, next) => {
        try {
            const result = await saveMetadata(req.file);
            res.status(200).json({
                status: 'success',
                data: result,
            });
        } catch (error) {
            console.error(error);
            res.status(500).send(error);
        }
    });

router.route('/insights')
    // Retrieve overall insights from data
    .get(async (req, res, next) => {
        try {
            const result = await getInsights();
            res.status(200).json({
                status: 'success',
                data: result,
            });
        } catch (error) {
            console.error(error);
            res.status(500).send(error);
        }
    });

// TODO: Nice to have
router.route('/file')
    // Download a file
    .get(async (req, res, next) => {
        try {
            const result = await downloadFile(req.body);
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