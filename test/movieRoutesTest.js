'use strict';

const request = require('supertest');
const Server = require('../server');

describe('Movie routes', () => {
    let server;

    beforeAll(async () => {
        server = await Server.deployment({ start: false });
    });

    afterAll(async () => {
        await server.stop();
    });

    it('should get all movies', async () => {
        const res = await request(server.listener).get('/movies');
        expect(res.statusCode).toEqual(200);
        // Add more assertions here if needed
    });

    it('should get one movie by ID', async () => {
        const res = await request(server.listener).get('/movies/1');
        expect(res.statusCode).toEqual(200);
        // Add more assertions here if needed
    });

    it('should create a new movie', async () => {
        const newMovie = {
            title: 'Test Movie',
            description: 'This is a test movie'
            // Add more movie fields if needed
        };
        const res = await request(server.listener)
            .post('/movies')
            .send(newMovie);
        expect(res.statusCode).toEqual(201);
        // Add more assertions here if needed
    });

    // Add similar tests for update and delete routes

});
