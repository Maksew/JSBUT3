'use strict';

const Joi = require('joi');
const { Model } = require('@hapipal/schwifty');
const Bcrypt = require('bcrypt');

module.exports = class User extends Model {

    static get tableName() {

        return 'user';
    }

    static get joiSchema() {
        return Joi.object({
            id: Joi.number().integer().greater(0),
            username: Joi.string().min(1).max(255).required(), // Nouveau champ
            email: Joi.string().email().required(), // Nouveau champ
            password: Joi.string().min(8).required(), // Nouveau champ, assurez-vous d'avoir une contrainte sur la longueur minimale
            firstName: Joi.string().min(3).example('John').description('Firstname of the user'),
            lastName: Joi.string().min(3).example('Doe').description('Lastname of the user'),
            createdAt: Joi.date(),
            updatedAt: Joi.date()
        });
    }

    // Vous pouvez ajouter une méthode pour chiffrer le mot de passe avant de l'insérer
    async $beforeInsert(queryContext) {
        await super.$beforeInsert(queryContext);
        this.password = await Bcrypt.hash(this.password, 10); // Hash le mot de passe avec Bcrypt
        this.updatedAt = new Date();
        this.createdAt = this.updatedAt;
    }

    // Assurez-vous de chiffrer le nouveau mot de passe lors de la mise à jour aussi
    async $beforeUpdate(opt, queryContext) {
        await super.$beforeUpdate(opt, queryContext);
        if (opt.patch && this.password) {
            this.password = await Bcrypt.hash(this.password, 10); // Ré-chiffrer le mot de passe s'il est présent dans la mise à jour
        }
        this.updatedAt = new Date();
    }

    $beforeInsert(queryContext) {

        this.updatedAt = new Date();
        this.createdAt = this.updatedAt;
    }

    $beforeUpdate(opt, queryContext) {

        this.updatedAt = new Date();
    }


};