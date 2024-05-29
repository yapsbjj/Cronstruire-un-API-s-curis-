const express = require('express');
const router = express.Router();
const reservationController = require('../controllers/reservationController');
const isAuthenticated = require('../middleware/authMiddleware');

// Afficher la liste des réservations (accessible à tous)
router.get('/', reservationController.listReservations);

// Ajouter une nouvelle réservation (accessible uniquement aux utilisateurs authentifiés)
router.post('/', isAuthenticated, reservationController.createReservation);

// Supprimer une réservation (accessible uniquement aux utilisateurs authentifiés)
router.delete('/:id', isAuthenticated, reservationController.deleteReservation);

module.exports = router;
