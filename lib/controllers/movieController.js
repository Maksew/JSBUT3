const MovieService = require('../services/movieService');
const { sendEmailNotifications } = require('../services/emailNotificationService');
const Boom = require('@hapi/boom');

exports.create = async (request, h) => {
    try {
        // Check for admin scope
        if (!request.auth.credentials.scope.includes('admin')) {
            return Boom.forbidden('Insufficient scope');
        }

        const movieData = request.payload;
        const newMovie = await MovieService.create(movieData);

        // Envoyer des notifications par e-mail après la création du film
        await sendEmailNotifications(newMovie.id);

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

        // Envoyer des notifications par e-mail après la mise à jour du film
        await sendEmailNotifications(updatedMovie.id);

        return h.response(updatedMovie).code(200);
    } catch (error) {
        return Boom.internal('Failed to update movie', error);
    }
};
