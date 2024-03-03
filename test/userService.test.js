'use strict';

const { createServer } = require('@hapi/hapi');
const Lab = require('@hapi/lab');
const { expect } = require('@hapi/code');
const UserService = require('../lib/services/user');

const { afterEach, beforeEach, describe, it } = exports.lab = Lab.script();

describe('UserService', () => {
    let server;

    beforeEach(async () => {
        server = createServer();
        await server.register(UserService.plugin);
    });

    afterEach(async () => {
        await server.stop();
    });

    it('should create a new user and send a welcome email', async () => {
        // Mock user data
        const user = {
            firstName: 'John',
            lastName: 'Doe',
            email: 'john.doe@example.com'
        };

        const insertStub = jest.spyOn(server.models().User.query(), 'insertAndFetch').mockResolvedValue(user);
        const sendEmailStub = jest.spyOn(UserService.prototype, 'sendWelcomeEmail').mockResolvedValue();

        const response = await server.userService.create(user);

        expect(response).toEqual(user);
        expect(insertStub).toHaveBeenCalledWith(user);
        expect(sendEmailStub).toHaveBeenCalledWith(user.email, user.firstName);
    });

    // Add more tests for other methods if needed
});
