const router = require('express').Router({ mergeParams: true });
const { getAllFiles, saveMetadata, getInsights } = require('../controllers/files');
const { uploadFile } = require('../middleware/files');

// All account-based CRUD routes would eventually have an account scope modifier (authentication), but not for the purposes of this challenge
router.route('/')
    // Get all files (metadata) (would have been displayed on an 'uploaded files' page on the frontend)
    .get(async (req, res, next) => {
        const { currentPage = null, pageSize = null } = req.query;
        try {
            const result = await getAllFiles(currentPage, pageSize);
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
    .post(uploadFile().single('file'), async (req, res, next) => {
        try {
            await saveMetadata(req.file);
            res.status(200).json({ status: 'success' });
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

module.exports = router;