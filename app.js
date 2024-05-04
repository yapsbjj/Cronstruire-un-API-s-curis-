const express = require('express');
const app = express();
const indexRouter = require('./routes/index.js');
const catwaysRouter = require('./routes/catway.js');
const reservationsRouter = require('./routes/reservations.js');
const documentationRouter = require('./routes/documentation.js');
const { MongoClient } = require('mongodb');

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.use('/', indexRouter);
app.use('/catways', catwaysRouter);
app.use('/reservations', reservationsRouter);
app.use('/documentation', documentationRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Serveur en cours sur le port ${PORT}`);
});

// URL de connexion à la base de données MongoDB
const url = 'mongodb://localhost:27017/your_database_name';

// Créer une nouvelle instance de connexion MongoDB
const client = new MongoClient(url);

// Connecter à la base de données MongoDB
async function connectToDatabase() {
  try {
    // Connexion à la base de données
    await client.connect();
    console.log('Connection à la base de données avec succès');
  } catch (error) {
    console.error('Erreur lors de la connection à la base de données:', error);
  }
}

// Appeler la fonction de connexion à la base de données
connectToDatabase();




