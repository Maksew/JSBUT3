const Movie = require('../models/movie');
const User = require('../models/user');
const MailerService = require('../services/mail');


async function sendEmailNotifications(movieId) {
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

module.exports = {
    sendEmailNotifications
};
