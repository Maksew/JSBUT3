# Bibliothèque de Films - FilmLibrary

![Build Status](https://img.shields.io/badge/build-passing-brightgreen)
![Version](https://img.shields.io/badge/version-1.0.0-blue)
![License](https://img.shields.io/badge/license-MIT-lightgrey)

Bienvenue sur le projet FilmLibrary, une application web permettant de gérer une bibliothèque de films et d'envoyer des notifications par e-mail. Conçue avec Node.js et Hapi.js, cette application offre une interface pour ajouter, modifier, supprimer et lister des films, ainsi que pour envoyer des e-mails automatisés lors de la création d'utilisateurs ou de la modification de films.

## Fonctionnalités

- **Gestion des Films** : Ajoutez, modifiez et supprimez des films dans votre bibliothèque.
- **Notifications E-mail** : Envoyez des e-mails automatiques pour informer les utilisateurs des changements.
- **Sécurité** : Utilisation de JWT pour authentifier et autoriser les utilisateurs.
- **Validations** : Validation des entrées utilisateur avec Joi pour renforcer la sécurité.

## Configuration de l'Environnement

Pour que l'application fonctionne correctement, vous devez définir les variables d'environnement suivantes :

```env
# .env example
NODE_ENV=development
PORT=3000
HOST=localhost
EMAIL_HOST=smtp.example.com
EMAIL_PORT=587
EMAIL_USERNAME=your-email@example.com
EMAIL_PASSWORD=your-email-password
JWT_SECRET=your-jwt-secret
```

## Installation

Pour installer les dépendances, exécutez la commande suivante :

```bash
npm install
```


## Exécution des Migrations

Pour créer et initialiser la base de données, exécutez :

```bash
npm run migrate
```

## Démarrage de l'Application

Pour lancer le serveur, utilisez :

```bash
npm start
```

## Tests

Pour exécuter les tests, lancez :

```bash
npm test
```


## Contribution

Les contributions sont toujours les bienvenues ! Veuillez créer une issue ou soumettre une pull request pour toute contribution.
