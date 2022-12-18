// Controller files contain service business logic and database interactions

const fs = require('fs');
const { query } = require('../db');
const { getFileExtension } = require('../utils/files');
// Utils and other abstracted logic would be imported here (to keep controllers clean)

// TODO: Manual testing (possibly unit)
// Gets metadata on all files from the database to display in a FE table
const getAllFiles  = async () => {
    // Get rows
    const { rows } = await query('SELECT * FROM files'); // TODO: Add pagination (body params + dynamic PSQL) for this endpoint if we end up taking this UI approach...
    // Return metadata
    return rows;
};

// TODO: Manual testing (possibly unit)
// Parses and saves files to the machine's file system (could also be cloud storage), then inserts file metadata into the DB
const uploadFile = async (data) => {
    const { fileName, fileBuffer } = data; // TODO: Implement 'multer' to write the file to disk
    // Write the actual file to the file system (to not bog down the database)
    await fs.writeFile(`/files/${fileName}`, fileBuffer);
    // Retrieve file stats
    const { size } = await fs.stat(`/files/${fileName}`);
    // Save file metadata to the DB
    const { rows } = await query('INSERT INTO files (file_name, size) VALUES ($1, $2)', [fileName, size]);
    // Return metadata
    return rows;
};

// TODO: Manual testing (possibly unit)
// TODO: Handles different file formats and creates charts for the client
// Retrieves a specific file as a binary string from the file system
const retrieveFile = async ({ fileName }) => {
    const buffer = await fs.readFile(`/files/${fileName}`);
    res.status(200).send(buffer); // TODO: Return file/chart as required by the frontend
};

// Export as many controllers as you like
module.exports = {
    getAllFiles,
    uploadFile,
    retrieveFile,
};
