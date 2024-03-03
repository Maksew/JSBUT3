const nodemailer = require('nodemailer');
require('dotenv').config();


// Configuration de Nodemailer pour utiliser un services SMTP
const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: 587,
    secure: false,
    auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
    },
});


// Fonction pour envoyer un e-mail
const sendEmail = async (to, subject, text) => {
    const mailOptions = {
        from: process.env.EMAIL_USERNAME,
        to: to,
        subject: subject,
        text: text,
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log(`Email sent: ${info.messageId}`);
    } catch (error) {
        console.error('Error sending email: ', error);
    }
};

module.exports = {
    sendEmail,
};
