require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const LocalStrategy = require('passport-local').Strategy;

const app = express();
const indexRouter = require('./routes/index.js');
const catwayRouter = require('./routes/catway.js');
const reservationsRouter = require('./routes/reservations.js');
const documentationRouter = require('./routes/documentation.js');
const usersRouter = require('./routes/users.js');
const authController = require('./controllers/authController.js');
const reservationController = require('./controllers/reservationController.js');
const isAuthenticated = require('./middleware/authMiddleware');

const User = require('./models/userModel');

// Configuration de la vue (ejs)
app.set('view engine', 'ejs');
app.use(express.static('public'));

// Middleware pour analyser le corps des requêtes POST
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware de session pour Passport.js
app.use(session({
  secret: process.env.SESSION_SECRET || 'secret', 
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: process.env.MONGODB_URI,
    ttl: 14 * 24 * 60 * 60 
  })
}));

// Initialisation de Passport pour l'authentification
app.use(passport.initialize());
app.use(passport.session());


passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Routes principales
app.use('/', indexRouter);
app.use('/catways', catwayRouter);
app.use('/reservations', reservationsRouter);
app.use('/documentation', documentationRouter);
app.use('/users', usersRouter);

// Route pour afficher le formulaire de connexion
app.get('/login', (req, res) => {
  res.render('index');
});

// Route pour traiter la connexion avec le contrôleur d'authentification
app.post('/login', authController.login);

// Route protégée par le middleware d'authentification
app.get('/dashboard', isAuthenticated, reservationController.showDashboard);

// Connexion à MongoDB
const uri = process.env.MONGODB_URI;
async function connectDB() {
  try {
    await mongoose.connect(uri);
    console.log('Connexion à MongoDB réussie');
  } catch (error) {
    console.error('Erreur lors de la connexion à MongoDB :', error);
  }
}

connectDB();

// Démarrage du serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Serveur en cours sur le port ${PORT}`);
});
