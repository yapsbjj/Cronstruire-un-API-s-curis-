const User = require('../models/userModel');

// Afficher la liste
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.render('users', { users });
  } catch (error) {
    console.error(error);
    res.status(500).send('Erreur serveur lors de la récupération des utilisateurs');
  }
};

// Enregistrer un utilisateur
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

// Supprimer un utilisateur
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
