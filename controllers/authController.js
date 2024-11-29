/**
 * @file authController.js
 * @description Contrôleur pour la gestion de l'authentification.
 */

const passport = require('passport');

/**
 * Gère le processus de connexion.
 * @function login
 * @param {Object} req - Objet de requête Express.
 * @param {Object} res - Objet de réponse Express.
 * @param {Function} next - Fonction middleware pour passer à l'étape suivante.
 * @returns {void}
 */
exports.login = (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      console.error('Erreur d\'authentification:', err);
      return next(err);
    }
    if (!user) {
      console.log('Utilisateur non trouvé');
      return res.redirect('/login');
    }
    req.logIn(user, (err) => {
      if (err) {
        console.error('Erreur lors de la connexion de l\'utilisateur:', err);
        return next(err);
      }
      console.log('Connexion réussie, redirection vers le tableau de bord');
      return res.redirect('/dashboard');
    });
  })(req, res, next);
};
