'use strict';

const request = require('supertest');
const Server = require('../server');

describe('User routes', () => {
    let server;

    beforeAll(async () => {
        server = await Server.deployment({ start: false });
    });

    afterAll(async () => {
        await server.stop();
    });

    it('should create a new user', async () => {
        const newUser = {
            firstName: 'John',
            lastName: 'Doe'
        };
        const res = await request(server.listener)
            .post('/user')
            .send(newUser);
        expect(res.statusCode).toEqual(200);
    });
});
