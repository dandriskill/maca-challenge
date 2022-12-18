// Controller files contain service business logic and database interactions

const fs = require('fs');
const { query } = require('../db');
// Utils and other abstracted logic would be imported here (to keep controllers clean)

// TODO: Add pagination (body params + dynamic PSQL) for this endpoint if we end up taking this UI approach...
// Gets metadata on all files from the database to display in a FE table
const getAllFiles  = async () => {
    // Get rows
    const { rows } = await query('SELECT * FROM files');
    // Return metadata
    return rows;
};

// Inserts file metadata into the DB for reference
const saveMetadata = async (file) => {
    const { filename } = file;
    // Retrieve file stats
    const { size } = await fs.stat(`/files/${filename}`);
    // Save file metadata to the DB
    const { rows } = await query('INSERT INTO files (file_name, size) VALUES ($1, $2)', [filename, size]);
    // TODO: Create new database table to store insights, so that we aren't later retrieving & parsing mountainous files from disk.

    // Return metadata
    return rows;
};

// Creates charts for the client
const getInsights = async ({ fileName }) => {
    // TODO: Access insights table and return actionable data to the client.
};

// Retrieves a specific file as a binary string from the file system (data scientists may find this download feature useful)
const downloadFile = async ({ fileName }) => {
    const buffer = await fs.readFile(`/files/${fileName}`);
    res.status(200).send(buffer);
};

// Export as many controllers as you like
module.exports = {
    getAllFiles,
    saveMetadata,
    getInsights,
    downloadFile,
};
