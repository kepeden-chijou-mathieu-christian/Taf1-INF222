const sqlite3 = require('sqlite3').verbose(); 
const path = require('path');

const dbPath = path.resolve(__dirname, '../../database.sqlite');

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Erreur lors de la connexion à la base de données SQLite:', err.message);
  } else {
    console.log('Connecté à la base de données SQLite.');
    
   db.run(`CREATE TABLE IF NOT EXISTS articles (
      id INTEGER PRIMARY KEY AUTOINCREMENT, /* id s'incrémente tout seul: 1, 2, 3... */
      title TEXT NOT NULL,                  /* titre obligatoire */
      content TEXT NOT NULL,                /* contenu obligatoire */
      author TEXT NOT NULL,                 /* auteur obligatoire */
      date TEXT NOT NULL,                   /* date obligatoire */
      category TEXT,                        /* catégorie optionnelle */
      tags TEXT                             /* tags (stockés sous forme de texte JSON) */
    )`);
  }
});

module.exports = db;
