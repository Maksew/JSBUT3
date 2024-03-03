'use strict';

const { createServer } = require('@hapi/hapi');
const Lab = require('@hapi/lab');
const { expect } = require('@hapi/code');
const Movies = require('../lib/models/movie');
const MovieService = require('../lib/services/movieService');

const { afterEach, beforeEach, describe, it } = exports.lab = Lab.script();

describe('MovieService', () => {
    let server;

    beforeEach(async () => {
        server = createServer();
        await server.register(MovieService.plugin);
    });

    afterEach(async () => {
        await server.stop();
    });

    it('should create a new movie', async () => {
        const movieData = {
            title: 'Test Movie',
            description: 'This is a test movie'
        };

        const user = { role: 'admin' };
        const insertStub = jest.spyOn(Movies.query(), 'insert').mockResolvedValue(movieData);
        const response = await server.movieService.create(movieData, user);
        expect(response).toEqual(movieData);
        expect(insertStub).toHaveBeenCalledWith(movieData);
    });

    // Add more tests for other methods if needed
});
