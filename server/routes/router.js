const router = require('express').Router();
const filesRouter = require('./files');

// Add more routers here as needed
router.use('/files', filesRouter);

module.exports = router;
