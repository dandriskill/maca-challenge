const {
    getFileExtension,
    reduceDealAmounts,
    parseFileInsights,
} = require('../files');

const { parseCSV, parseJSON } = require('../parsers');
jest.mock('../parsers');

describe('getFileExtension()', () => {
    test('returns correct file extension', () => {
        expect(getFileExtension('yolo.csv')).toBe('csv');
        expect(getFileExtension('yolo.json')).toBe('json');
    });
});

describe('reduceDealAmounts()', () => {
    test('returns the correct sum of an array of floats, of type string', () => {
        expect(reduceDealAmounts([4.50, 5.78, 135.84, 17.00, 70000.01])).toBe('70163.13');
    });
});

describe('parseFileInsights()', () => {
    test('throws correct error if an invalid file is provided', () => {
        expect(parseFileInsights('yolo.pdf')).rejects.toThrowError('File insights could not be parsed.');
    });
    test('returns correct insights for a .csv file', async () => {
        parseCSV.mockImplementationOnce(() => ([
            [0, 'd.driskill@live.com', '801-888-0935', '2376 East 1610 South', '$450.01'],
            [1, null, null, null, '$200.00'],
            [2, 'someemail@email.com', '801-555-5566', '300 East 100 South', null],
            [3, 'email@email.com', '801-555-4444', '400 North Sesame Street', null],
            [4, 'yolo@swaggins.com', '801-555-6627', '1 Hacker Lane', '$600.00'],
        ]));
        expect(await parseFileInsights('yolo.csv')).toStrictEqual({
            numLines: 5,
            numNoContactInfo: 1,
            numNoDeal: 2,
            dealsTotal: '1250.01',
        });
    });
    test('returns correct insights for a .json file', async () => {
        parseJSON.mockImplementationOnce(() => ([
            {email: 'd.driskill@live.com', phone: '801-888-0935', address: '2376 East 1610 South', deal_value: '$450.01'},
            {email: null, phone: null, address: null, deal_value: '$200.00'},
            {email: 'someemail@email.com', phone: '801-555-5566', address: '300 East 100 South', deal_value: null},
            {email: 'email@email.com', phone: '801-555-4444', address: '400 North Sesame Street', deal_value: null},
            {email: 'yolo@swaggins.com', phone: '801-555-6627', address: '1 Hacker Lane', deal_value: '$600.00'},
        ]));
        expect(await parseFileInsights('yolo.json')).toStrictEqual({
            numLines: 5,
            numNoContactInfo: 1,
            numNoDeal: 2,
            dealsTotal: '1250.01',
        });
    });
});
