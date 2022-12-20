const fs = require('fs');
const { promisify } = require('util');
const readFile = promisify(fs.readFile);
const { parse } = require('csv-parse');

const parseCSV = (fileName) => {
    // Return in the form of a promise
    return new Promise((resolve, reject) => {
        // Create array for parsed line items
        const lineItems = [];
        // Create file read stream
        fs.createReadStream(`files/${fileName}`)
            // Parse
            .pipe(parse({delimiter: ','}))
            // Push to line items array
            .on('data', function(row) {
                lineItems.push(row);        
            })
            // Return line items
            .on('end',function() {
                resolve(lineItems);
            })
            .on('error', function(err) {
                reject(err);
            });
    });
};

const parseJSON = async (fileName) => {
    // Get file
    const file = await readFile(`files/${fileName}`)
    // Parse JSON file
    return JSON.parse(file);
};

module.exports = {
    parseCSV,
    parseJSON,
};
