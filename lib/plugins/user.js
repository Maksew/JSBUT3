// UserService.js dans le dossier /plugins

'use strict';

const { Service } = require('@hapipal/schmervice');
const MailerService = require('../services/mail');

class UserService extends Service {
    async create(user) {
        const { User } = this.server.models();

        // Insertion de l'utilisateur et récupération des données
        const newUser = await User.query().insertAndFetch(user);

        // Préparation de l'email de bienvenue
        const emailOptions = {
            from: '"Votre Service" <noreply@votredomaine.com>',
            to: newUser.email,
            subject: 'Bienvenue sur notre plateforme!',
            text: `Bonjour ${newUser.firstName}, bienvenue à notre service. Votre compte a été créé avec succès.`,
            html: `<b>Bonjour ${newUser.firstName},</b><p>Bienvenue à notre service. Votre compte a été créé avec succès.</p>`
        };

        // Envoi de l'email via le services de messagerie
        try {
            await MailerService.sendEmail(emailOptions.to, emailOptions.subject, emailOptions.text);
            console.log('Email de bienvenue envoyé avec succès.');
        } catch (error) {
            console.error('Erreur lors de l envoi de l email de bienvenue :', error);
        }

        return newUser;
    }
}

const register = async (server, options) => {
    const instance = new UserService(server, options);
    server.decorate('server', 'userService', instance);
};

exports.plugin = {
    name: 'UserService',
    register,
    once: true,
    pkg: require('../../package.json')
};
