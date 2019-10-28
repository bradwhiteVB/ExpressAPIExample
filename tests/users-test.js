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

    it('should return 404 status and JSON payload - no user', async function() {
        const response = await request(app)
            .get('/users/1')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/);;
        assert.equal(response.status, 404);
    });

});

describe('Unit testing the /users DELETE route', function() {

    it('should return 404 status and JSON response', async function() {
        const response = await request(app)
            .delete('/users/24')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(404);
        assert.equal(response.status, 404);
    });

    it('should return 200 status and simple json success messge', async function() {
        const response = await request(app)
            .delete('/users/0')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200);
        assert.equal(response.status, 200);
    });

});

describe('Unit testing the /users POST route', function() {

    it('should return OK status', async function() {
        const response = await request(app)
            .post('/users')
            .send({name: 'john', email:'blah@test.com', dob: '2000-10-12'})
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(201);
        assert.equal(response.status, 201);
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

