'use strict';

const HauteCouture = require('@hapipal/haute-couture');
const Package = require('../package.json');

exports.plugin = {
    pkg: Package,
    register: async (server, options) => {
        console.log('Début de la composition Haute Couture');
        try {
            await HauteCouture.compose(server, options);
            console.log('Haute Couture a fini de composer');
        } catch (error) {
            console.error('Erreur lors de la composition:', error.message);
            // Log de la pile d'appels pour aider à localiser l'erreur
            console.error(error.stack);
        }
    }
};
