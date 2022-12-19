// Controller files contain service business logic and database interactions
const fs = require('fs');
const { query } = require('../db');
const { parseFileInsights } = require('../utils/files');
// Utils and other abstracted logic would be imported here (to keep controllers clean)

// Get paginated, cursory metadata for all files
const getAllFiles  = async ({ pageSize, currentPage }) => {
    if (!pageSize || !currentPage) {
        throw new Error('Pagination settings not provided.');
    }
    const offset = (currentPage - 1) * pageSize;
    // Get rows
    const { rows = [] } = await query(
        'SELECT id, file_name, size, created_at FROM files LIMIT $1 OFFSET $2',
        [pageSize, offset],
    );
    // Get total number of rows to calculate the total number of pages (for the UI)
    const totalRows = await query(`SELECT COUNT(*) FROM files`);
    const totalPages = Math.ceil(totalRows / pageSize);
    // Return metadata
    return {
        rows,
        totalPages,
    };
};

// Inserts file metadata into the DB for future reference
const saveMetadata = async (file) => {
    const { filename, buffer } = file;
    if (!file || !filename || !buffer) {
        throw new Error('File data not provided.');
    }
    // Retrieve file stats
    const { size } = await fs.stat(`/files/${filename}`);
    // Get file insights
    const { numLines, numNoContactInfo, numNoDeal, dealsTotal } = parseFileInsights(buffer);
    // Save file metadata to the DB (in the future, we would want to include logic to merge metadata for duplicate companies)
    const { rows } = await query(
        'INSERT INTO files (file_name, size, num_lines, num_no_contact_info, num_no_deal, deals_total) VALUES ($1, $2, $3, $4, $5, $6)',
        [filename, size, numLines, numNoContactInfo, numNoDeal, dealsTotal]
    );
    // Return metadata
    return rows;
};

// TODO: Generate SMALLER files in larger numbers for upload testing, in order make insights more meaningful
// Generates meaningful insights for the client
const getInsights = async ({ fileName }) => {
    // For each upload (date)...
    // Get deal total
    // Get percent of line items with no deal
    // Get percent of line items with no contact info
};

// TODO: Get this working (nice to have)
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
