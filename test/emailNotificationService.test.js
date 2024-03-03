'use strict';

const EmailNotificationService = require('../lib/services/email-notification-service');
const Movie = require('../lib/models/movie');
const User = require('../lib/models/user');
const MailerService = require('../lib/services/mail');

describe('EmailNotificationService', () => {
    let emailNotificationServiceMock;

    beforeEach(() => {
        emailNotificationServiceMock = new EmailNotificationService();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should send email notifications for a specific movie', async () => {
        const movieId = 1;
        const movie = { id: movieId, title: 'Test Movie', description: 'This is a test movie' };
        const users = [{ id: 1, firstName: 'John', email: 'john@example.com', favorites: [movieId] }];

        Movie.query().findById = jest.fn().mockResolvedValue(movie);
        User.query().where = jest.fn().mockResolvedValue(users);
        MailerService.sendEmail = jest.fn().mockResolvedValue();
        await emailNotificationServiceMock.sendEmailNotifications(movieId);
        expect(Movie.query().findById).toHaveBeenCalledWith(movieId);
        expect(User.query().where).toHaveBeenCalledWith('favorites', '@>', [movieId]);
        expect(MailerService.sendEmail).toHaveBeenCalledTimes(users.length);
        users.forEach(user => {
            const emailContent = `Bonjour ${user.firstName},\n\nLe film "${movie.title}" a été créé ou mis à jour.\nDescription : ${movie.description}\n\nCordialement,\nVotre application`;
            expect(MailerService.sendEmail).toHaveBeenCalledWith(user.email, 'Nouveau film ajouté ou mis à jour', emailContent);
        });
    });
    //...
});
