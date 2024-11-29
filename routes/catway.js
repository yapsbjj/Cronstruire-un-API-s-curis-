/**
 * @file catway.js
 * @description Routes pour la gestion des Catways.
 */

const express = require('express');
const router = express.Router();
const catwayController = require('../controllers/catwayController');
const reservationController = require('../controllers/reservationController');

/**
 * @route GET /catways
 * @description Récupère tous les Catways.
 */
router.get('/', catwayController.getCatwaysPage);

/**
 * @route GET /catways/:id
 * @description Récupère un Catway spécifique par son identifiant.
 */
router.get('/:id', catwayController.getCatwayById);

/**
 * @route GET /catways/:id
 * @description Récupère un Catway spécifique par son identifiant.
 */
router.post('/', catwayController.createCatway);

/**
 * @route PUT /catways/:id
 * @description Modifie un Catway existant.
 */
router.put('/:id', catwayController.updateCatway);

/**
 * @route DELETE /catways/:id
 * @description Supprime un Catway spécifique.
 */
router.delete('/:id', catwayController.deleteCatway);

// Route pour afficher le dashboard
router.get('/dashboard', reservationController.showDashboard);

module.exports = router;




