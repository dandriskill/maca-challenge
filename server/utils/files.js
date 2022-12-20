const Decimal = require('decimal.js');
const { parseCSV, parseJSON } = require('./parsers.js');

const getFileExtension = (fileName) => {
    const fileNameArr = fileName.split('.');
    return fileNameArr[fileNameArr.length - 1].toLowerCase();
};

// Removes '$' symbol from string and returns as type 'float'
const parseCashAmount = (amount) => {
    return parseFloat(amount.replace(/\$/g, ''))
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
    if (ext === 'csv') { // Assumes no CSV header
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
            if (!line[DEAL_VALUE_INDEX]) {
                return true;
            }
            return false;
        }).length;
        // Get/Set total deals amount for this file (remove '$' and parse float, then change back to a string)
        const dealAmounts = fileArray
            .filter(line => line[DEAL_VALUE_INDEX])
            .map(line => parseCashAmount(line[DEAL_VALUE_INDEX]));
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
            .map(line => parseCashAmount(line.deal_value));
        insights.dealsTotal = reduceDealAmounts(dealAmounts);
    } else {
        throw new Error('File insights could not be parsed.');
    }

    // Get/Set number of lines
    insights.numLines = fileArray.length || 0;

    return insights;
};

module.exports = {
    getFileExtension,
    parseCashAmount,
    reduceDealAmounts,
    parseFileInsights,
};