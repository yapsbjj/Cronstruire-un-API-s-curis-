const express = require('express');
const router = express.Router();
const User = require('../models/userModel');

// Route POST pour créer un nouvel utilisateur
router.post('/create', async (req, res) => {
    try {
        const { username, password } = req.body;

        // Créer un nouvel utilisateur
        const newUser = new User({ username });
        await User.register(newUser, password);

        // Afficher la vue users.ejs avec des données (optionnelles)
        res.render('users', { message: 'Utilisateur créé avec succès', user: newUser });
    } catch (err) {
        res.status(500).render('users', { message: 'Erreur lors de la création de l\'utilisateur', error: err.message });
    }
});

module.exports = router;

