const express = require('express');
const router = express.Router();
const catwayController = require('../controllers/catwayController');

// Routes catways
router.get('/catways', catwayController.getAllCatways);
router.get('/catways/:id', catwayController.getCatwayById);
router.post('/catways', catwayController.createCatway);
router.put('/catways/:id', catwayController.updateCatwayById);
router.delete('/catways/:id', catwayController.deleteCatwayById);

// Routes réservations
router.get('/catways/:id/reservations', catwayController.getAllReservationsForCatway);
router.get('/catways/:id/reservations/:idReservation', catwayController.getReservationByIdForCatway);
router.post('/catways/:id/reservations', catwayController.createReservationForCatway);
router.delete('/catways/:id/reservations/:idReservation', catwayController.deleteReservationByIdForCatway);

module.exports = router;
