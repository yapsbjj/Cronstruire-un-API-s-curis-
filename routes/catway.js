const express = require('express');
const router = express.Router();
const catwayController = require('../controllers/catwayController');
const reservationController = require('../controllers/reservationController');

router.get('/', catwayController.getCatwaysPage);
router.get('/:id', catwayController.getCatwayById);
router.post('/', catwayController.createCatway);

router.get('/dashboard', reservationController.showDashboard);

module.exports = router;





