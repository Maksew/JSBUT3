'use strict';

const HauteCouture = require('@hapipal/haute-couture');
const Package = require('../package.json');

exports.plugin = {
    pkg: Package,
    register: async (server, options) => {
        console.log('Début de la composition Haute Couture');
        await HauteCouture.compose(server, options);
        console.log('Haute Couture a fini de composer');
    }
};
