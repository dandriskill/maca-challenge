export const validateFileExtension = (fileName) => {
    if (!fileName || typeof fileName !== 'string') {
        return false;
    }

    const allowedExtensions = ['csv', 'json'];
    const fileNameArr = fileName.split('.');
    const fileExtension = fileNameArr[fileNameArr.length - 1].toLowerCase();

    if (!allowedExtensions.includes(fileExtension)) {
        return false;
    }
    
    return true;
};

export const parseDate = (strDate) => {
    return new Date(Date.parse(strDate)).toLocaleDateString();
};

export const parseMoneyString = (v) => {
    return parseFloat(v.replace(/\$|,/g, ''));
};
