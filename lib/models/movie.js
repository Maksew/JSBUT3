'use strict';

const { Model } = require('objection');

class Movie extends Model {
    static get tableName() {
        return 'movies';
    }

    static get jsonSchema() {
        return {
            type: 'object',
            required: ['title', 'description', 'releaseDate', 'director'],
            properties: {
                title: { type: 'string' },
                description: { type: 'string' },
                releaseDate: { type: 'string', format: 'date' },
                director: { type: 'string' }
            }
        };
    }
}

module.exports = Movie;
