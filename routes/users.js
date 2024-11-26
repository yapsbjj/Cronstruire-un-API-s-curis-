const express = require('express');
const router = express.Router();
const User = require('../models/userModel');

// Route POST pour créer un nouvel utilisateur
router.post('/create', async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Créer un nouvel utilisateur
        const newUser = new User({ username, email });
        await User.register(newUser, password);

        // Afficher la vue users.ejs avec des données
        const users = await User.find(); // Récupérer tous les utilisateurs pour l'affichage
        res.render('users', { 
            message: 'Utilisateur créé avec succès', 
            user: newUser, 
            users: users // Passer les utilisateurs à la vue
        });
    } catch (err) {
        res.status(500).render('users', { 
            message: 'Erreur lors de la création de l\'utilisateur', 
            error: err.message,
            users: [] // Passer une liste vide en cas d'erreur
        });
    }
});

// Route GET pour afficher tous les utilisateurs
router.get('/', async (req, res) => {
    try {
        const users = await User.find(); // Récupérer tous les utilisateurs
        res.render('users', { 
            users: users, 
            message: null, 
            user: null // Aucune info utilisateur spécifique pour cette vue
        });
    } catch (err) {
        res.status(500).render('users', { 
            message: 'Erreur lors du chargement des utilisateurs', 
            error: err.message, 
            users: []
        });
    }
});

// Route PUT pour modifier un utilisateur
router.put('/update/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { username, email } = req.body;

        // Mettre à jour l'utilisateur
        const updatedUser = await User.findByIdAndUpdate(id, { username, email }, { new: true });

        if (!updatedUser) {
            return res.status(404).json({ message: 'Utilisateur non trouvé' });
        }

        res.status(200).json({ message: 'Utilisateur modifié avec succès', user: updatedUser });
    } catch (err) {
        res.status(500).json({ message: 'Erreur lors de la modification de l\'utilisateur', error: err.message });
    }
});

// Route DELETE pour supprimer un utilisateur
router.delete('/delete/:id', async (req, res) => {
    try {
        const { id } = req.params;

        // Supprimer l'utilisateur
        const deletedUser = await User.findByIdAndDelete(id);

        if (!deletedUser) {
            return res.status(404).json({ message: 'Utilisateur non trouvé' });
        }

        res.status(200).json({ message: 'Utilisateur supprimé avec succès', user: deletedUser });
    } catch (err) {
        res.status(500).json({ message: 'Erreur lors de la suppression de l\'utilisateur', error: err.message });
    }
});

module.exports = router;
