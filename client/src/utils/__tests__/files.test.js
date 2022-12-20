import { validateFileExtension, parseMoneyString } from '../files';

describe('validateFileExtension()', () => {
    test('returns false if no file name provided, or if fileName is not a string', () => {
        expect(validateFileExtension(null)).toBe(false);
        expect(validateFileExtension(7)).toBe(false);
    });
    test('returns false if file extension is invalid', () => {
        expect(validateFileExtension('yolo.pdf')).toBe(false);
    });
    test('returns true for .csv and .json files', () => {
        expect(validateFileExtension('yolo.json')).toBe(true);
        expect(validateFileExtension('yolo.csv')).toBe(true);
    });
});

describe('parseMoneyString()', () => {
    test('returns correctly parsed money string', () => {
        expect(parseMoneyString('$4543.07')).toBe(4543.07);
        expect(parseMoneyString('$190,498,489,218,579.81')).toBe(190498489218579.81);
    });
});
