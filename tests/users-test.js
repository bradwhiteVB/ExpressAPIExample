'use strict';

const assert = require('assert');
const expect = require('chai').expect
const request = require('supertest');
const app = require('../app')


describe('Unit testing the /users GET route', function() {

    it('should return OK status and JSON payload - ALL', async function() {
        const response = await request(app)
            .get('/users')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/);
        assert.equal(response.status, 200);
    });

    it('should return OK status and JSON payload - Initial user', async function() {
        const response = await request(app)
            .get('/users/0')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/);;
        assert.equal(response.status, 200);
    });

});

describe('Unit testing the /users DELETE route', function() {

    it('should return 400 status and JSON response', async function() {
        const response = await request(app)
            .delete('/users/24')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(400);
        assert.equal(response.status, 400);
    });

    it('should return 204 status and no response pn success', async function() {
        const response = await request(app)
            .delete('/users/0')
            // .set('Accept', 'application/json')
            .expect(204);
        assert.equal(response.status, 204);
    });

});

describe('Unit testing the /users POST route', function() {

    it('should return OK status', async function() {
        const response = await request(app)
            .post('/users')
            .send({name: 'john', email:'blah@test.com', dob: '2000-10-12'})
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200);
        assert.equal(response.status, 200);
    });

    it('should return 422 status - missing name', async function() {
        const response = await request(app)
            .post('/users')
            .send({email:'blah@test.com', dob: '19990101'})
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(422);
        assert.equal(response.status, 422);
    });

    it('should return 422 status - missing email', async function() {
        const response = await request(app)
            .post('/users')
            .send({name: 'john', dob: '19990101'})
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(422);
        assert.equal(response.status, 422);
    });

    it('should return 422 status - missing dob', async function() {
        const response = await request(app)
            .post('/users')
            .send({name: 'john', email:'blah@test.com'})
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(422);
        assert.equal(response.status, 422);
    });

    it('should return 422 status - name not long enough', async function() {
        const response = await request(app)
            .post('/users')
            .send({name: 'BW', email:'blah@test.com', dob: '19990101'})
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(422);
        assert.equal(response.status, 422);
    });

    it('should return 422 status - email not valid', async function() {
        const response = await request(app)
            .post('/users')
            .send({name: 'Blah Test', email:'blah@test', dob: '19990101'})
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(422);
        assert.equal(response.status, 422);
    });
});

