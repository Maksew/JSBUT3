const MovieService = require('../../lib/plugins/movieService');
const Boom = require('@hapi/boom');

exports.getAll = async (request, h) => {
    try {
        const movies = await MovieService.getAll();
        return h.response(movies).code(200);
    } catch (error) {
        return Boom.internal('Failed to retrieve movies', error);
    }
};

exports.getOne = async (request, h) => {
    try {
        const movie = await MovieService.getOne(request.params.id);
        if (!movie) {
            return Boom.notFound('Movie not found');
        }
        return h.response(movie).code(200);
    } catch (error) {
        return Boom.internal('Failed to retrieve the movie', error);
    }
};

exports.create = async (request, h) => {
    try {
        // Check for admin scope
        if (!request.auth.credentials.scope.includes('admin')) {
            return Boom.forbidden('Insufficient scope');
        }

        const movieData = request.payload;
        const newMovie = await MovieService.create(movieData);
        return h.response(newMovie).code(201);
    } catch (error) {
        return Boom.internal('Failed to create movie', error);
    }
};

exports.update = async (request, h) => {
    try {
        // Check for admin scope
        if (!request.auth.credentials.scope.includes('admin')) {
            return Boom.forbidden('Insufficient scope');
        }

        const movieData = request.payload;
        const updatedMovie = await MovieService.update(request.params.id, movieData);
        if (!updatedMovie) {
            return Boom.notFound('Movie not found');
        }
        return h.response(updatedMovie).code(200);
    } catch (error) {
        return Boom.internal('Failed to update movie', error);
    }
};

exports.delete = async (request, h) => {
    try {
        // Check for admin scope
        if (!request.auth.credentials.scope.includes('admin')) {
            return Boom.forbidden('Insufficient scope');
        }

        const deletionInfo = await MovieService.delete(request.params.id);
        if (!deletionInfo) {
            return Boom.notFound('Movie not found');
        }
        return h.response(deletionInfo).code(200);
    } catch (error) {
        return Boom.internal('Failed to delete movie', error);
    }
};
