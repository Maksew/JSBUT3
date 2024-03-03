'use strict';

const { Service } = require('@hapipal/schmervice');
const Movies = require('../models/movie');
const NotificationsService = require('../services/emailNotificationService'); // Assurez-vous que ce service est implémenté pour gérer les notifications par email

class MovieService extends Service {
    // eslint-disable-next-line require-await
    async findAll() {
        return Movies.query();
    }

    // eslint-disable-next-line require-await
    async findOne(id) {
        return Movies.query().findById(id);
    }

    async create(movieData, user) {
        if (user.role !== 'admin') {
            throw new Error('Seuls les administrateurs peuvent ajouter des films.');
        }

        const newMovie = await Movies.query().insert(movieData);
        await NotificationsService.notifyNewMovie(newMovie);
        return newMovie;
    }

    async update(id, movieData, user) {
        if (user.role !== 'admin') {
            throw new Error('Seuls les administrateurs peuvent modifier des films.');
        }

        const updatedMovie = await Movies.query().patchAndFetchById(id, movieData);
        await NotificationsService.notifyUpdatedMovie(updatedMovie);
        return updatedMovie;
    }

    async delete(id, user) {
        if (user.role !== 'admin') {
            throw new Error('Seuls les administrateurs peuvent supprimer des films.');
        }

        await NotificationsService.notifyDeletedMovie(id);
        return Movies.query().deleteById(id);
    }
}

module.exports = {
    plugin: {
        name: 'movieService',
        register: async (server, options) => {
            const instance = new MovieService(server, options);
            server.decorate('server', 'movieService', instance);
        }
    }
};
