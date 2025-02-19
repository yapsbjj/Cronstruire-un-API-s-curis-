/**
 * @file userController.js
 * @description Contrôleur pour la gestion des utilisateurs.
 */

const User = require('../models/userModel');

/**
 * Récupère et affiche la liste des utilisateurs.
 * @async
 * @function getUsers
 * @param {Object} req - Objet de requête Express.
 * @param {Object} res - Objet de réponse Express.
 * @returns {void}
 */
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.render('users', { users });
  } catch (error) {
    console.error(error);
    res.status(500).send('Erreur serveur lors de la récupération des utilisateurs');
  }
};

/**
 * Crée un nouvel utilisateur.
 * @async
 * @function createUser
 * @param {Object} req - Objet de requête Express.
 * @param {Object} req.body - Corps de la requête.
 * @param {string} req.body.username - Nom d'utilisateur.
 * @param {string} req.body.password - Mot de passe de l'utilisateur.
 * @param {Object} res - Objet de réponse Express.
 * @returns {void}
 */
exports.createUser = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = new User({ username, password });
    await user.save();
    res.status(201).send('Utilisateur créé avec succès');
  } catch (error) {
    console.error(error);
    res.status(500).send('Erreur serveur lors de la création de l\'utilisateur');
  }
};

/**
 * Supprime un utilisateur par son identifiant.
 * @async
 * @function deleteUser
 * @param {Object} req - Objet de requête Express.
 * @param {string} req.params.id - Identifiant de l'utilisateur.
 * @param {Object} res - Objet de réponse Express.
 * @returns {void}
 */
exports.deleteUser = async (req, res) => {
  const userId = req.params.id;
  try {
    await User.findByIdAndDelete(userId);
    res.status(200).send('Utilisateur supprimé avec succès');
  } catch (error) {
    console.error(error);
    res.status(500).send('Erreur serveur lors de la suppression de l\'utilisateur');
  }
};
