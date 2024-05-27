const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');
const app = express();
const indexRouter = require('./routes/index.js');
const catwayRouter = require('./routes/catway.js');
const reservationsRouter = require('./routes/reservations.js');
const documentationRouter = require('./routes/documentation.js');
const usersRouter = require('./routes/users.js');
const authController = require('./controllers/authController.js');
const reservationController = require('./controllers/reservationController.js');
const { isAuthenticated } = require('./middleware/authMiddleware');

// Configurer le moteur de vue
app.set('view engine', 'ejs');
app.use(express.static('public'));

// Middleware pour analyser les corps de requêtes
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Middleware pour permettre les méthodes PUT et DELETE dans les formulaires HTML
app.use(methodOverride('_method'));

// Middleware de session pour Passport.js
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}));

// Initialisation de Passport.js pour l'authentification
app.use(passport.initialize());
app.use(passport.session());

const User = require('./models/userModel');
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use('/', indexRouter);
app.use('/catways', catwayRouter);
app.use('/reservations', reservationsRouter);
app.use('/documentation', documentationRouter);
app.use('/users', usersRouter);
app.post('/login', authController.login);

app.get('/dashboard', reservationController.showDashboard);

const url = 'mongodb://127.0.0.1:27017/DB';

mongoose.connect(url)
  .then(() => console.log('Connexion à MongoDB réussie'))
  .catch(err => console.error('Erreur de connexion à MongoDB :', err));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Serveur en cours sur le port ${PORT}`);
});
