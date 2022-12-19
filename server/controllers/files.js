// Controller files contain service business logic and database interactions
const fs = require('fs');
const { promisify } = require('util');
const stat = promisify(fs.stat);
const { query } = require('../db');
// Utils and other abstracted logic imported here to keep controllers clean
const { parseFileInsights } = require('../utils/files');

// Inserts file metadata into the DB for future reference
const saveMetadata = async (file) => {
    const { filename } = file;
    if (!file || !filename) {
        throw new Error('File data not provided.');
    }
    // Retrieve file stats
    const { size } = await stat(`files/${filename}`);
    // Get file insights
    const { numLines, numNoContactInfo, numNoDeal, dealsTotal } = await parseFileInsights(filename);
    // Save file metadata to the DB (in the future, we would want to include logic to merge metadata for duplicate companies)
    await query(
        'INSERT INTO files (file_name, size, num_lines, num_no_contact_info, num_no_deal, deals_total) VALUES ($1, $2, $3, $4, $5, $6)',
        [filename, size, numLines, numNoContactInfo, numNoDeal, dealsTotal]
    );
};

// Generates meaningful insights for the client
const getInsights = async () => {
    // For each upload, get the number of lines, total amount, upload date, percent with no contact info, and percent with no deal
    const { rows } = await query(`
        WITH
            metadata AS (SELECT id, num_lines, deals_total, created_at FROM files),
            no_contact_info AS (SELECT id, ROUND((num_no_contact_info * 100.0 / num_lines), 1) AS percent_no_contact_info FROM files),
            no_deal AS (SELECT id, ROUND ((num_no_deal * 100.0 / num_lines), 1) AS percent_no_deal from files)
        SELECT m.id, m.num_lines, m.deals_total, m.created_at, nci.percent_no_contact_info, nd.percent_no_deal
        FROM metadata m
        JOIN no_contact_info nci ON m.id = nci.id
        JOIN no_deal as nd ON m.id = nd.id;
    `);
    return rows;
};

// Get paginated metadata of all uploaded files (NOT ACTUALLY USED ON THE FRONTEND - FUTURE FEATURE)
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
    // Calculate the total number of pages (for the UI)
    const totalPages = Math.ceil(rows.length / pageSize);
    // Return metadata
    return {
        rows,
        totalPages,
    };
};

// Export as many controllers as you like
module.exports = {
    getAllFiles,
    saveMetadata,
    getInsights,
    // downloadFile,
};
