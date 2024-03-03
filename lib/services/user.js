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
        const transporter = nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: process.env.EMAIL_PORT,
            secure: false,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASSWORD
            }
        });

        const mailOptions = {
            from: `"Votre Service" <${process.env.EMAIL_FROM}>`,
            to: email,
            subject: 'Bienvenue sur notre plateforme!',
            text: `Bonjour ${firstName}, bienvenue à notre service. Votre compte a été créé avec succès.`,
            html: `<b>Bonjour ${firstName},</b><p>Bienvenue à notre service. Votre compte a été créé avec succès.</p>`
        };
        try {
            await transporter.sendMail(mailOptions);
            console.log('Email de bienvenue envoyé avec succès.');
        } catch (error) {
            console.error('Erreur lors de l\'envoi de l\'email de bienvenue :', error);
        }
    }
}

exports.plugin = {
    name: 'UserService',
    register: async (server, options) => {
        const instance = new UserService(server, options);
        server.decorate('server', 'userService', instance);
    }
};
