const express = require('express');
const router = express.Router();
const reservationController = require('../controllers/reservationController');

// Afficher la liste des resa
router.get('/', reservationController.getReservations);

// Afficher les détails d'une resa
router.get('/:id', reservationController.getReservationDetails);

// Créer une nouvelle resa
router.post('/', reservationController.createReservation);

// Supprimer une resa
router.delete('/:id', reservationController.deleteReservation);

module.exports = router;
