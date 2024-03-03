'use strict';

const { Service } = require('@hapipal/schmervice');
const Movies = require('../models/movie');

class MovieService extends Service {
    async findAll() {
        return Movies.query();
    }

    async findOne(id) {
        return Movies.query().findById(id);
    }

    async create(movieData) {
        return Movies.query().insert(movieData);
    }

    async update(id, movieData) {
        return Movies.query().patchAndFetchById(id, movieData);
    }

    async delete(id) {
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
