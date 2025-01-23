const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function () {
    suite('Function convertHandler.getNum(input)', function () {
        test('Whole number input', function () {
            assert.equal(convertHandler.getNum('32L'), 32);
        });
        test('Decimal number input', function () {
            assert.equal(convertHandler.getNum('32.5L'), 32.5);
        });
        test('Fractional input', function () {
            assert.equal(convertHandler.getNum('1/2L'), 0.5);
        });
        test('Fractional input with decimal', function () {
            assert.equal(convertHandler.getNum('1.5/2L'), 0.75);
        });
        test('No number input', function () {
            assert.equal(convertHandler.getNum('L'), 1);
        });
        test('Invalid number input', function () {
            assert.equal(convertHandler.getNum('32.5.5L'), 'invalid number');
        });
    suite('Function convertHandler.getUnit(input)', function () {
            test('For each valid unit inputs', function (done) {
                let input = ['gal', 'l', 'mi', 'km', 'lbs', 'kg'];
                let output = ['gal', 'L', 'mi', 'km', 'lbs', 'kg'];
                input.forEach(function (ele, i) {
                    assert.equal(convertHandler.getUnit(ele), output[i]);
                });
                done();
            });

            test('Unknown unit input', function () {
                assert.equal(convertHandler.getUnit('34kilograms'), 'invalid unit');
            });

    suite('Function convertHandler.getReturnUnit(initUnit)', function () {
            test('For each valid unit inputs', function (done) {
                    let input = ['gal', 'l', 'mi', 'km', 'lbs', 'kg'];
                    let output = ['L', 'gal', 'km', 'mi', 'kg', 'lbs'];
                    input.forEach(function (ele, i) {
                        assert.equal(convertHandler.getReturnUnit(ele), output[i]);
                    });
                    done();
                });
        });

    suite('Function convertHandler.spellOutUnit(unit)', function () {
            test('For each valid unit inputs', function (done) {
                let input = ['gal', 'l', 'mi', 'km', 'lbs', 'kg'];
                let output = ['gallons', 'liters', 'miles', 'kilometers', 'pounds', 'kilograms'];
                input.forEach(function (ele, i) {
                    assert.equal(convertHandler.spellOutUnit(ele), output[i]);
                });
                done();
            });
        });
    });

    suite('Function convertHandler.convert(initNum, initUnit)', function () {
        test('Gal to L', function () {
            let input = [5, 'gal'];
            let output = 18.9271;
            assert.approximately(convertHandler.convert(input[0], input[1]), output, 0.1);
        });
        test('L to Gal', function () {
            let input = [5, 'L'];
            let output = 1.32086;
            assert.approximately(convertHandler.convert(input[0], input[1]), output, 0.1);
        });
        test('Mi to Km', function () {
            let input = [5, 'mi'];
            let output = 8.04672;
            assert.approximately(convertHandler.convert(input[0], input[1]), output, 0.1);
        });
        test('Km to Mi', function () {
            let input = [5, 'km'];
            let output = 3.10686;
            assert.approximately(convertHandler.convert(input[0], input[1]), output, 0.1);
        });
        test('Lbs to Kg', function () {
            let input = [5, 'lbs'];
            let output = 2.26796;
            assert.approximately(convertHandler.convert(input[0], input[1]), output, 0.1);
        });
        test('Kg to Lbs', function () {
            let input = [5, 'kg'];
            let output = 11.02312;
            assert.approximately(convertHandler.convert(input[0], input[1]), output, 0.1);
        });

    });

    });

});