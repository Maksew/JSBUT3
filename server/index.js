'use strict';

const Glue = require('@hapi/glue');
const Exiting = require('exiting');
const Manifest = require('./manifest');

exports.deployment = async ({ start } = {}) => {
    const manifest = Manifest.get('/', process.env);
    const server = await Glue.compose(manifest, { relativeTo: __dirname });

    if (start) {
        await Exiting.createManager(server).start();
        console.log(`Server started at ${server.info.uri}`);

        // Assurez-vous que les services sont bien enregistrés et accessibles
        console.log('Services disponibles sur le serveur:', server.methods); // server.services() n'est pas standard, server.methods si vous utilisez server.method pour enregistrer des méthodes

        return server;
    }

    await server.initialize();
    return server;
};

if (require.main === module) {
    exports.deployment({ start: true }).catch(err => {
        console.error(err);
        process.exit(1);
    });
}
