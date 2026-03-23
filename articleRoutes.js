const express = require('express');
const router = express.Router();
const articleController = require('../controllers/articleController');

/**
 * @swagger
 * components:
 *   schemas:
 *     Article:
 *       type: object
 *       required:
 *         - title
 *         - content
 *         - author
 *         - date
 *       properties:
 *         id:
 *           type: integer
 *           description: L'identifiant auto-généré de l'article
 *         title:
 *           type: string
 *           description: Le titre de l'article
 *         content:
 *           type: string
 *           description: Le contenu de l'article
 *         author:
 *           type: string
 *           description: L'auteur de l'article
 *         date:
 *           type: string
 *           format: date
 *           description: La date de création de l'article
 *         category:
 *           type: string
 *           description: La catégorie de l'article
 *         tags:
 *           type: array
 *           items:
 *             type: string
 *           description: Les tags associés à l'article
 *       example:
 *         title: Introduction à Node.js
 *         content: Express est un framework minimaliste pour Node.js.
 *         author: John Doe
 *         date: "2026-03-19"
 *         category: Tech
 *         tags: ["Node.js", "Express", "Backend"]
 */

/**
 * @swagger
 * /api/articles/search:
 *   get:
 *     summary: Recherche des articles par titre ou contenu
 *     tags: [Articles]
 *     parameters:
 *       - in: query
 *         name: query
 *         schema:
 *           type: string
 *         required: true
 *         description: Le texte à rechercher
 *     responses:
 *       200:
 *         description: Liste des articles correspondants
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Article'
 *       400:
 *         description: Le paramètre query est manquant
 */
router.get('/search', articleController.searchArticles);

/**
 * @swagger
 * /api/articles:
 *   get:
 *     summary: Récupère la liste de tous les articles
 *     tags: [Articles]
 *     parameters:
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *         description: Filtrer par catégorie
 *       - in: query
 *         name: author
 *         schema:
 *           type: string
 *         description: Filtrer par auteur
 *       - in: query
 *         name: date
 *         schema:
 *           type: string
 *         description: Filtrer par date
 *     responses:
 *       200:
 *         description: La liste des articles
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Article'
 */
router.get('/', articleController.getAllArticles);

/**
 * @swagger
 * /api/articles/{id}:
 *   get:
 *     summary: Récupère un article par son ID
 *     tags: [Articles]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: L'identifiant de l'article
 *     responses:
 *       200:
 *         description: L'article demandé
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Article'
 *       404:
 *         description: Article non trouvé
 */
router.get('/:id', articleController.getArticleById);

/**
 * @swagger
 * /api/articles:
 *   post:
 *     summary: Crée un nouvel article
 *     tags: [Articles]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Article'
 *     responses:
 *       201:
 *         description: L'article a été créé avec succès
 *       400:
 *         description: Données d'entrée invalides
 *       500:
 *         description: Erreur serveur
 */
router.post('/', articleController.createArticle);

/**
 * @swagger
 * /api/articles/{id}:
 *   put:
 *     summary: Met à jour un article
 *     tags: [Articles]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: L'identifiant de l'article
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Article'
 *     responses:
 *       200:
 *         description: L'article a été mis à jour
 *       404:
 *         description: Article non trouvé
 *       500:
 *         description: Erreur serveur
 */
router.put('/:id', articleController.updateArticle);

/**
 * @swagger
 * /api/articles/{id}:
 *   delete:
 *     summary: Supprime un article
 *     tags: [Articles]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: L'identifiant de l'article
 *     responses:
 *       200:
 *         description: L'article a été supprimé
 *       404:
 *         description: Article non trouvé
 */
router.delete('/:id', articleController.deleteArticle);

module.exports = router;