'use strict';

exports.up = async (knex) => {
    await knex.schema.alterTable('user', (table) => {
        table.string('username').notNullable().unique(); // Ajoute le champ 'username' unique et obligatoire
        table.string('email').notNullable().unique(); // Ajoute le champ 'email' unique et obligatoire
        table.string('password').notNullable(); // Ajoute le champ 'password' obligatoire
    });
};

exports.down = async (knex) => {
    await knex.schema.alterTable('user', (table) => {
        table.dropColumn('username');
        table.dropColumn('email');
        table.dropColumn('password');
    });
};
