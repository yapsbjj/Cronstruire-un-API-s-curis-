const express = require('express');
const router = express.Router();
const User = require('../models/userModel');

router.post('/create', async (req, res) => {
    try {
        const { username, password } = req.body;
        const newUser = new User({ username });
        await User.register(newUser, password);
        res.send('Utilisateur créé avec succès');
    } catch (err) {
        res.status(500).send(err.message);
    }
});

module.exports = router;

