'use strict';

const Glue = require('@hapi/glue');
const Exiting = require('exiting');
const Manifest = require('./manifest');
const EmailNotificationService = require('../lib/services/email-notification-service');

exports.deployment = async ({ start } = {}) => {
    const manifest = Manifest.get('/', process.env);
    const server = await Glue.compose(manifest, { relativeTo: __dirname });

    console.log('Composition du serveur terminée. Démarrage du serveur...');
    await server.register(EmailNotificationService);

    if (start) {
        await Exiting.createManager(server).start();
        console.log(`Server started at ${server.info.uri}`);
        console.log('Services disponibles sur le serveur:', Object.keys(server.registrations));

        return server;
    }

    await server.initialize();
    return server;
};

if (require.main === module) {
    exports.deployment({ start: true }).catch((err) => {
        console.error(err);
        process.exit(1);
    });
}
