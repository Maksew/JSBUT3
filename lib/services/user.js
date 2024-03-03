'use strict';

const { Service } = require('@hapipal/schmervice');
const nodemailer = require('nodemailer');

class UserService extends Service {

    async create(user) {
        const { User } = this.server.models();
        const newUser = await User.query().insertAndFetch(user);

        await this.sendWelcomeEmail(newUser.email, newUser.firstName);

        return newUser;
    }

    async sendWelcomeEmail(email, firstName) {
        // Créer un transporteur nodemailer en utilisant les variables d'environnement pour les paramètres SMTP
        const transporter = nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: process.env.EMAIL_PORT,
            secure: false, // true pour 465, false pour les autres ports
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASSWORD
            }
        });

        // Définir les options d'email
        const mailOptions = {
            from: `"Votre Service" <${process.env.EMAIL_FROM}>`, // adresse de l'expéditeur
            to: email, // liste des destinataires
            subject: 'Bienvenue sur notre plateforme!', // Sujet
            text: `Bonjour ${firstName}, bienvenue à notre service. Votre compte a été créé avec succès.`, // texte corporel
            html: `<b>Bonjour ${firstName},</b><p>Bienvenue à notre service. Votre compte a été créé avec succès.</p>` // html corporel
        };

        // Envoyer l'email avec le transporteur défini
        try {
            await transporter.sendMail(mailOptions);
            console.log('Email de bienvenue envoyé avec succès.');
        } catch (error) {
            console.error('Erreur lors de l\'envoi de l\'email de bienvenue :', error);
        }
    }
}

exports.plugin = {
    name: 'UserService', // Nom du service pour l'enregistrement
    register: async (server, options) => {
        const instance = new UserService(server, options);
        server.decorate('server', 'userService', instance);
    }
};
