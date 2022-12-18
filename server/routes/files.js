const router = require('express').Router({ mergeParams: true });
const { getAllFiles, saveMetadata, getInsights, downloadFile } = require('../controllers/files');
const { uploadFile } = require('../middleware/files');

// TODO: Write unit tests (breakage prevention, since not logic-heavy)

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
    // Upload a file
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
    // Generate overall insights from data
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