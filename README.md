# Taf1-INF222
# API Backend pour un Blog Simple 

## Technologies Utilisées
- **Node.js** : Langage serveur
- **Express** : Framework d'application web
- **SQLite3** : Base de données 
- **Swagger** : Documentation de l'API

## Prérequis
- Avoir Node.js installé : https://nodejs.org/fr/

## Installation et Lancement

1. **Installer les dépendances** :
```bash
npm install
```

2. **Démarrer le serveur** :
```bash
npm start
```



3. Une fois démarrée, vous verrez les messages :
- `Connecté à la base de données SQLite.`
- `Serveur démarré sur http://localhost:3000`
- `Documentation Swagger disponible sur http://localhost:3000/api-docs`

## Documentation Swagger
Toute la documentation de l'API, les routes, les paramètres et les exemples de requêtes sont disponibles via l'UI Swagger.

Naviguez vers : http://localhost:3000/api-docs

### Endpoints Principaux

- `POST /api/articles` : Créer un article (Titre, contenu, auteur, date, tag et catégorie requis)
- `GET /api/articles` : Lire tous les articles (possibilité de filtrer via `?category=Value` ou `?author=Nom`)
- `GET /api/articles/{id}` : Récupérer les détails d’un article spécifique
- `PUT /api/articles/{id}` : Mettre à jour un article
- `DELETE /api/articles/{id}` : Supprimer un article
- `GET /api/articles/search?query=texte` : Chercher "texte" dans le titre ou le contenu des articles

## Architecture

- `index.js` : Point d'entrée de notre application, configuration de Express et de Swagger.
- `src/config/database.js` : Fichier de configuration et de connexion à SQLite.
- `src/models/article.js` : Le modèle s'occupant d'interroger la BDD en SQL.
- `src/controllers/articleController.js` : Contient la logique backend et la vérification pour chaque route.
- `src/routes/articleRoutes.js` : Définition des différentes routes de l'API et documentation Swagger correspondante.
