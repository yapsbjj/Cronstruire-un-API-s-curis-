const express = require('express');
const router = express.Router();
const catwayController = require('../controllers/catwayController');
const reservationController = require('../controllers/reservationController');

// Route pour afficher tous les catways
router.get('/', catwayController.getCatwaysPage);

// Route pour afficher un catway spécifique par son identifiant
router.get('/:id', catwayController.getCatwayById);

// Route pour créer un nouveau catway
router.post('/', catwayController.createCatway);

// Route pour modifier un catway spécifique par son identifiant
router.put('/:id', catwayController.updateCatway);

// Route pour supprimer un catway spécifique par son identifiant
router.delete('/:id', catwayController.deleteCatway);

// Route pour afficher le dashboard
router.get('/dashboard', reservationController.showDashboard);

module.exports = router;





