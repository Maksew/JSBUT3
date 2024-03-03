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

## Démarrage de l'Application

Pour lancer le serveur, utilisez :

```bash
npm start
```

## Guide d'Installation Détaillé

Après avoir cloné le dépôt et configuré les variables d'environnement comme décrit ci-dessus, suivez ces étapes pour configurer votre environnement de développement.

### Configuration des Plugins

Les plugins Hapi.js sont configurés dans le dossier `lib/plugins`. Chaque fichier correspond à un plugin spécifique. Par exemple :

- `@hapi/jwt.js` pour l'authentification JWT.
- `swagger.js` pour la documentation de l'API avec Swagger.

Assurez-vous de configurer chaque plugin selon les besoins de votre environnement.

## Exécution des Migrations

Pour créer et initialiser la base de données, exécutez :

```bash
npm run migrate
```

### Gestion de la Base de Données

Le dossier `lib/migrations` contient les scripts de migration pour initialiser et mettre à jour les schémas de base de données. Veillez à exécuter les migrations avant de démarrer l'application.

### Tests

Le dossier `test` contient des tests pour chaque partie importante de l'application. Exécutez régulièrement les tests pour vous assurer que les modifications n'introduisent pas de régressions.

Pour exécuter les tests, lancez :

```bash
npm test
```

### Exemple de Requêtes API

Vous pouvez trouver des exemples de requêtes pour chaque route dans le dossier `lib/routes`. Pour tester l'API en développement, vous pouvez utiliser des outils comme Postman ou des requêtes `curl` directement depuis votre terminal.

## Structure du Projet

Voici un aperçu de la structure de dossiers principale de l'application FilmLibrary :

```plaintext
iut-project/
├── .env                   # Contient les variables d'environnement
├── lib/                   # Contient les modules de l'application
│   ├── auth/              # Gestion de l'authentification
│   ├── controllers/       # Contrôleurs pour gérer la logique de requête
│   ├── migrations/        # Scripts de migration de la base de données
│   ├── models/            # Modèles de base de données
│   ├── plugins/           # Plugins Hapi.js pour étendre les fonctionnalités
│   └── routes/            # Définitions des routes pour l'API
├── server/                # Configuration du serveur et point d'entrée
├── services/              # Services pour la logique métier
├── test/                  # Tests unitaires et d'intégration
├── package.json           # Dépendances et scripts NPM
├── package-lock.json      # Snapshot des dépendances pour NPM
└── README.md              # Documentation du projet
```

## Contribution

Si vous souhaitez contribuer au projet, veuillez suivre les étapes suivantes :

1. Fork le projet.
2. Créez une nouvelle branche pour chaque fonctionnalité ou correction.
3. Soumettez une pull request avec une description détaillée de vos changements.

N'oubliez pas d'ajouter des tests si vous introduisez de nouvelles fonctionnalités !

## Questions et Support

Si vous avez des questions ou besoin d'aide pour utiliser l'application, n'hésitez pas à ouvrir une issue dans le dépôt GitHub du projet.



Les contributions sont toujours les bienvenues ! Veuillez créer une issue ou soumettre une pull request pour toute contribution.
