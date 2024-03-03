module.exports = {
    env: {
        node: true,
        es6: true,
        jest: true
    },
    extends: 'eslint:recommended',
    parserOptions: {
        ecmaVersion: 2018
    },
    rules: {
        'no-console': 'off',
        'semi': ['error', 'always'],
        'quotes': ['error', 'single'],
        'indent': ['error', 4],
        // Ajoutez d'autres règles personnalisées ici
    },
    overrides: [
        {
            files: ['**/*.test.js'],
            env: {
                jest: true
            },
            // Vous pouvez ajouter des règles spécifiques pour les tests ici
        }
    ]
};
