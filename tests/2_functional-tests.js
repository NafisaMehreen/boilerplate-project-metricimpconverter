const chaiHttp = require('chai-http');
const chai = require('chai');
let assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function () {
    suite('Routing fields', function () {
        test('GET /api/convert => conversion object', function (done) {
            chai.request(server)
                .get('/api/convert')
                .query({ input: '10L' })
                .end(function (req, res) {
                    assert.equal(res.status, 200);
                    assert.deepEqual(res.body, {
                        initNum: 10,
                        initUnit: 'L',
                        returnNum: 2.64172,
                        returnUnit: 'gal',
                        string: '10 liters converts to 2.64172 gallons'
                    });
                    done();
                });

        });
        test('GET /api/convert => invalid unit', (done) => {
            chai.request(server)
                .get('/api/convert')
                .query({ input: '32g' })
                .end((err, res) => {
                    assert.equal(res.status, 200);
                    assert.equal(res.body.error, 'invalid unit');
                    done();
                })
        });
        test('GET /api/convert => invalid number', (done) => {
            chai.request(server)
                .get('/api/convert')
                .query({ input: '32/3/7lbs' })
                .end((err, res) => {
                    assert.equal(res.status, 200);
                    assert.equal(res.body.error, 'invalid number');
                    done();
                });
        });
        test('GET /api/convert => invalid number and unit', (done) => {
            chai.request(server)
                .get('/api/convert')
                .query({ input: '3/7.2/4kilograms' })
                .end((err, res) => {
                    assert.equal(res.status, 200);
                    assert.equal(res.body.error, 'invalid number and unit');
                    done();
                });
        });
        test('GET /api/convert => no number', (done) => {
            chai.request(server)
                .get('/api/convert')
                .query({ input: 'kg' })
                .end((err, res) => {
                    assert.equal(res.status, 200);
                    assert.equal(res.body.initNum, 1);
                    assert.equal(res.body.initUnit, 'kg');
                    assert.approximately(res.body.returnNum, 2.20462, 0.1);
                    assert.equal(res.body.returnUnit, 'lbs');
                    done();
                });
        });
    });
});