const { fileTypeFromBuffer } = require('file-type');
const csv = require('csv-parse/lib/sync');
const Decimal = require('decimal.js');

const parseCSVBuffer = (buffer) => {
    // Parse buffer to CSV
    return csv(buffer, {
        columns: true,
        skip_empty_lines: true,
    });
};

const parseJSONBuffer = (buffer) => {
    // Parse buffer to JSON
    return JSON.stringify(Buffer.from(buffer));
};

// Adds all deal amounts precisely and converts to string
const reduceDealAmounts = (dealAmounts) => {
    return dealAmounts.reduce((acc, cur) => {
        const a = new Decimal(acc);
        const c = new Decimal(cur);
        return a.add(c).toString();
    }, 0);
};

// Parsing insights here avoids retrieving & parsing multiple large files whenever a user hits the insights dashboard.
const parseFileInsights = async (buffer) => {
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
    const { ext } = await fileTypeFromBuffer(buffer);
    // Parse CSV or JSON
    if (ext === 'csv') {
        // Parse CSV buffer into an array
        fileArray = parseCSVBuffer(buffer);
        // Get/Set number of lines without an address, phone, or email
        insights.numNoContactInfo = fileArray.filter(line => {
            // 0: email, 1: phone, 2: address
            if (!line[0] && !line[1] && !line[2]) {
                return true;
            }
            return false;
        }).length;
        // Get/Set number of lines with no deal
        insights.numNoContactInfo = fileArray.filter(line => {
            // 4: deal_value
            if (!line[4]) {
                return true;
            }
            return false;
        }).length;
        // Get/Set total deals amount for this file (remove '$' and parse float, then change back to a string)
        const dealAmounts = fileArray
            .filter(line => line[4])
            .map(line => parseFloat(line[4].replace(/\$/g, '')));
        insights.dealsTotal = reduceDealAmounts(dealAmounts);
    } else if (ext === 'json') {
        // Parse JSON buffer into an array
        fileArray = parseJSONBuffer(buffer);
        // Get/Set number of lines without an address, phone, or email
        insights.numNoContactInfo = fileArray.filter(line => {
            if (!line.email && !line.phone && !line.address) {
                return true;
            }
            return false;
        }).length;
        // Get/Set number of lines with no deal
        insights.numNoContactInfo = fileArray.filter(line => {
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