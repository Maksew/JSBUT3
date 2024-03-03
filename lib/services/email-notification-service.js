'use strict';

const { Service } = require('@hapipal/schmervice');
const Movie = require('../models/movie');
const User = require('../models/user');
const MailerService = require('../services/mail'); // Assurez-vous que le chemin d'importation est correct

class EmailNotificationService extends Service {

    async sendEmailNotifications(movieId) {
        try {
            const movie = await Movie.query().findById(movieId);

            // Récupérer les utilisateurs qui ont ce film dans leurs favoris
            const users = await User.query().where('favorites', '@>', [movieId]);

            // Envoyer un e-mail à chaque utilisateur
            for (const user of users) {
                const emailContent = `Bonjour ${user.firstName},\n\nLe film "${movie.title}" a été créé ou mis à jour.\nDescription : ${movie.description}\n\nCordialement,\nVotre application`;

                // Envoyer l'e-mail à l'utilisateur
                await MailerService.sendEmail(user.email, 'Nouveau film ajouté ou mis à jour', emailContent);
            }

            console.log('Notifications par e-mail envoyées avec succès aux utilisateurs concernés.');
        } catch (error) {
            console.error('Erreur lors de l envoi des notifications par e-mail :', error);
        }
    }
}

EmailNotificationService.schema = { name: 'EmailNotificationService' }; // Ajout de la propriété 'name'

exports.plugin = {
    name: 'EmailNotificationService',
    register: async (server, options) => {
        const instance = new EmailNotificationService(server, options);
        server.decorate('server', 'emailNotificationService', instance);
    }
};
