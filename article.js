const db = require('../config/database'); 

const ArticleModel = {
  
  // Sauvegarder un nouvel article 
  create: (article, callback) => {
   const { title, content, author, date, category, tags } = article;
    
    db.run(
      `INSERT INTO articles (title, content, author, date, category, tags) VALUES (?, ?, ?, ?, ?, ?)`,
      [title, content, author, date, category, tags ? JSON.stringify(tags) : '[]'],
      function (err) {
        callback(err, this ? this.lastID : null);
      }
    );
  },
  
  // Récupérer tous les articles avec ou sans filtres 
  findAll: (filters, callback) => {
    let query = `SELECT * FROM articles`; 
    let params = []; 
    if (filters.category || filters.author || filters.date) {
      let conditions = [];
      if (filters.category) {
        conditions.push(`category = ?`); 
        params.push(filters.category);
      }
      if (filters.author) {
        conditions.push(`author = ?`);
        params.push(filters.author);
      }
      if (filters.date) {
        conditions.push(`date = ?`);
        params.push(filters.date);
      }
     query += ` WHERE ` + conditions.join(' AND ');
    }
    
    db.all(query, params, (err, rows) => {
      if (err) {
          return callback(err, null);
      }
      if (rows) {
         rows = rows.map(r => ({...r, tags: JSON.parse(r.tags)}));
      }
      callback(err, rows);
    });
  },
  // Récupérer un seul article selon son ID 
  findById: (id, callback) => {
     db.get(`SELECT * FROM articles WHERE id = ?`, [id], (err, row) => {
      if (row) {
        row.tags = JSON.parse(row.tags);
      }
      callback(err, row);
    });
  },
  
  // Modifier un article 
  update: (id, article, callback) => {
    const { title, content, category, tags } = article;
    let updates = []; 
    let params = [];
    
    if (title) { updates.push('title = ?'); params.push(title); }
    if (content) { updates.push('content = ?'); params.push(content); }
    if (category) { updates.push('category = ?'); params.push(category); }
    if (tags) { updates.push('tags = ?'); params.push(JSON.stringify(tags)); }
    
    if (updates.length === 0) {
        return callback(null, 0);
    }
    
    db.run(
      `UPDATE articles SET ${updates.join(', ')} WHERE id = ?`,
      [...params, id], 
      function (err) {
        callback(err, this ? this.changes : 0);
      }
    );
  },
  
  // Supprimer un article 
  delete: (id, callback) => {
    db.run(`DELETE FROM articles WHERE id = ?`, [id], function (err) {
      callback(err, this.changes); 
    });
  },
  
  // Recherche par texte 
  search: (query, callback) => {
   const searchStr = `%${query}%`;
    db.all(
      `SELECT * FROM articles WHERE title LIKE ? OR content LIKE ?`,
      [searchStr, searchStr], 
      (err, rows) => {
        if (rows) {
           rows = rows.map(r => ({...r, tags: JSON.parse(r.tags)}));
        }
        callback(err, rows);
      }
    );
  }
};

module.exports = ArticleModel;