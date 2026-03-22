// IMPORTATION DES LIBRAIRIES EXTERNES 
const express = require('express'); // Le framework principal pour créer le serveur web
const cors = require('cors'); 
const bodyParser = require('body-parser');
const swaggerJsdoc = require('swagger-jsdoc'); 
const swaggerUi = require('swagger-ui-express');
const articleRoutes = require('./src/routes/articleRoutes');

// INITIALISATION DU SERVEUR 
const app = express(); 
const PORT = process.env.PORT || 3000; 

// MIDDLEWARES 
app.use(cors());
app.use(bodyParser.json()); 

// CONFIGURATION DE SWAGGER
const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API Blog',
            version: '1.0.0',
            description: ' API backend  pour gérer un blog. TAF 1 de INF222.',
        },
        servers: [
            {
                url: `http://localhost:${PORT}`,
            },
        ],
    },
    apis: ['./src/routes/*.js'], 
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/api/articles', articleRoutes);

// On lance le serveur 
app.listen(PORT, () => {
    console.log(`Serveur démarré sur http://localhost:${PORT}`);
    console.log(`Documentation Swagger disponible sur http://localhost:${PORT}/api-docs`);
});