const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Afficher la liste des utilisateurs
router.get('/', userController.getUsers);

// Créer un nouvel utilisateur
router.post('/', userController.createUser);

// Supprimer un utilisateur
router.delete('/:id', userController.deleteUser);

module.exports = router;
