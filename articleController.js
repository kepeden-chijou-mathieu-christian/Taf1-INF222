const Article = require('../models/article');

// CREER UN ARTICLE (POST) 
exports.createArticle = (req, res) => {
 const { title, content, author, date, category, tags } = req.body;
  
  if (!title || !author) {
     return res.status(400).json({ error: 'Le titre et l\'auteur sont obligatoires' });
  }

  Article.create({ title, content, author, date, category, tags }, (err, id) => {
    if (err) return res.status(500).json({ error: err.message });
    
    res.status(201).json({ message: 'Article créé', id });
  });
};

// RÉCUPÉRER TOUS LES ARTICLES (GET)
exports.getAllArticles = (req, res) => {
 const filters = {
    category: req.query.category,
    author: req.query.author,
    date: req.query.date,
  };
  
  Article.findAll(filters, (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    
    res.status(200).json(rows);
  });
};

//RÉCUPÉRER UN ARTICLE PRÉCIS (GET) 
exports.getArticleById = (req, res) => {
  Article.findById(req.params.id, (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!row) return res.status(404).json({ error: 'Article non trouvé' });
    
   res.status(200).json(row);
  });
};

//  MODIFIER UN ARTICLE (PUT) 
exports.updateArticle = (req, res) => {
 Article.update(req.params.id, req.body, (err, changes) => {
    if (err) return res.status(500).json({ error: err.message });
    if (changes === 0) return res.status(404).json({ error: 'Article non trouvé ou pas de changement' });
    res.status(200).json({ message: 'Article mis à jour' });
  });
};

// SUPPRIMER UN ARTICLE (DELETE) 
exports.deleteArticle = (req, res) => {
  Article.delete(req.params.id, (err, changes) => {
    if (err) return res.status(500).json({ error: err.message });
    if (changes === 0) return res.status(404).json({ error: 'Article non trouvé' });
    res.status(200).json({ message: 'Article supprimé' });
  });
};

// RECHERCHER UN ARTICLE
exports.searchArticles = (req, res) => {
   const query = req.query.query;
  if (!query) {
      return res.status(400).json({ error: 'La requête de recherche (query) est requise' });
  }
  
  Article.search(query, (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
   res.status(200).json(rows);
  });
};
