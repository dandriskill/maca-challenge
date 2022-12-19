const fs = require('fs');
const { promisify } = require('util');
const readFile = promisify(fs.readFile);
const { parse } = require('csv-parse');
const Decimal = require('decimal.js');

// TODO: Figure out why 'num_no_contact_info' in JSON is larger than in CSV (start uploading smaller files for manual sum)

const getFileExtension = (fileName) => {
    const fileNameArr = fileName.split('.');
    return fileNameArr[fileNameArr.length - 1].toLowerCase();
};

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

// Adds all deal amounts precisely and converts to string
const reduceDealAmounts = (dealAmounts) => {
    // Reduce the sum of all deal amounts (float-parsed), using Decimal for precision
    return dealAmounts.reduce((acc, cur) => {
        const a = new Decimal(acc);
        const c = new Decimal(cur);
        return a.add(c).toString();
    }, 0);
};

// Parsing insights here avoids retrieving & parsing multiple large files whenever a user hits the insights dashboard.
const parseFileInsights = async (fileName) => {
    // Declare parsed file placholder in memory
    let fileArray;
    // Create insights object
    const insights = {
        numLines: null,
        numNoContactInfo: null,
        numNoDeal: null,
        dealsTotal: null,
    };
    // Determine file extension
    const ext = getFileExtension(fileName);
    // Parse CSV or JSON
    if (ext === 'csv') {
        // Declare index constants
        const EMAIL_INDEX = 1;
        const PHONE_INDEX = 2;
        const ADDRESS_INDEX = 3;
        const DEAL_VALUE_INDEX = 4;
        // Parse CSV into an array
        fileArray = await parseCSV(fileName);
        // Get/Set number of lines without an address, phone, or email
        insights.numNoContactInfo = fileArray.filter(line => {
            if (!line[EMAIL_INDEX] && !line[PHONE_INDEX] && !line[ADDRESS_INDEX]) {
                return true;
            }
            return false;
        }).length;
        // Get/Set number of lines with no deal
        insights.numNoDeal = fileArray.filter(line => {
            // 4: deal_value
            if (!line[DEAL_VALUE_INDEX]) {
                return true;
            }
            return false;
        }).length;
        // Get/Set total deals amount for this file (remove '$' and parse float, then change back to a string)
        const dealAmounts = fileArray
            .filter(line => line[DEAL_VALUE_INDEX])
            .map(line => parseFloat(line[DEAL_VALUE_INDEX].replace(/\$/g, '')));
        insights.dealsTotal = reduceDealAmounts(dealAmounts);
    } else if (ext === 'json') {
        // Parse JSON into an array
        fileArray = await parseJSON(fileName);
        // Get/Set number of lines without an address, phone, or email
        insights.numNoContactInfo = fileArray.filter(line => {
            if (!line.email && !line.phone && !line.address) {
                return true;
            }
            return false;
        }).length;
        // Get/Set number of lines with no deal
        insights.numNoDeal = fileArray.filter(line => {
            if (!line.deal_value) {
                return true;
            }
            return false;
        }).length;
        // Get/Set total deals amount (aggregate) for this file/upldate date (remove '$' and parse float)
        const dealAmounts = fileArray
            .filter(line => line.deal_value)
            .map(line => parseFloat(line.deal_value.replace(/\$/g, '')));
        insights.dealsTotal = reduceDealAmounts(dealAmounts);
    } else {
        throw new Error('File insights could not be parsed.');
    }

    // Get/Set number of lines
    insights.numLines = fileArray.length;

    return insights;
};

module.exports = {
    parseFileInsights,
};