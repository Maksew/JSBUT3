const MovieController = require('../controllers/movieController');
const Joi = require('joi');

module.exports = [
    {
        method: 'GET',
        path: '/movies',
        handler: MovieController.getAll,
        options: {
            description: 'Get all movies',
            notes: 'Returns an array of movies',
            tags: ['api']
        }
    },
    {
        method: 'GET',
        path: '/movies/{id}',
        handler: MovieController.getOne,
        options: {
            description: 'Get a single movie',
            notes: 'Returns a single movie by the id passed in the path',
            tags: ['api'],
            validate: {
                params: Joi.object({
                    id: Joi.number().required()
                })
            }
        }
    },
    {
        method: 'POST',
        path: '/movies',
        handler: MovieController.create,
        options: {
            description: 'Create a new movie',
            notes: 'Creates a new movie and returns the created movie',
            tags: ['api'], // ADD THIS TAG FOR SWAGGER DOCS IF YOU USE IT
            auth: {
                strategy: 'jwt',
                scope: ['admin']
            },
            validate: {
                payload: Joi.object({
                    title: Joi.string().required(),
                    description: Joi.string().required(),
                    // other movie fields...
                })
            }
        }
    },
    {
        method: 'PUT',
        path: '/movies/{id}',
        handler: MovieController.update,
        options: {
            description: 'Update a movie',
            notes: 'Updates the movie for the id passed in the path and returns the updated movie',
            tags: ['api'], // ADD THIS TAG FOR SWAGGER DOCS IF YOU USE IT
            auth: {
                strategy: 'jwt',
                scope: ['admin']
            },
            validate: {
                params: Joi.object({
                    id: Joi.number().required()
                }),
                payload: Joi.object({
                    title: Joi.string().optional(),
                    description: Joi.string().optional(),
                    // other movie fields...
                })
            }
        }
    },
    {
        method: 'DELETE',
        path: '/movies/{id}',
        handler: MovieController.delete,
        options: {
            description: 'Delete a movie',
            notes: 'Deletes the movie for the id passed in the path',
            tags: ['api'], // ADD THIS TAG FOR SWAGGER DOCS IF YOU USE IT
            auth: {
                strategy: 'jwt',
                scope: ['admin']
            },
            validate: {
                params: Joi.object({
                    id: Joi.number().required()
                })
            }
        }
    },
    // Vous pouvez ajouter d'autres routes si nécessaire
];
