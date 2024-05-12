const express = require('express');
const mongoose = require('mongoose'); // Importez mongoose
const app = express();
const indexRouter = require('./routes/index.js');
const catwayRouter = require('./routes/catway.js');
const reservationsRouter = require('./routes/reservations.js');
const documentationRouter = require('./routes/documentation.js');
const authController = require('./controllers/authController.js');


app.set('view engine', 'ejs');
app.use(express.static('public'));

app.use(express.urlencoded({ extended: true }));
app.use('/', indexRouter);
app.use('/catways', catwayRouter);
app.use('/reservations', reservationsRouter);
app.use('/documentation', documentationRouter);

app.post('/login', authController.login); 



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Serveur en cours sur le port ${PORT}`);
});

app.get('/dashboard', (req, res) => {
  res.render('dashboard');
});

// URL de connexion à la base de données MongoDB
const url = 'mongodb://127.0.0.1:27017/DB';

// Connectez-vous à la base de données MongoDB avec Mongoose
mongoose.connect(url)
  .then(() => console.log('Connexion à MongoDB réussie'))
  .catch(err => console.error('Erreur de connexion à MongoDB :', err));
