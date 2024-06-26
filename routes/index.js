const express = require('express');
const router = express.Router();
const reservationController = require('../controllers/reservationController');
const isAuthenticated = require('../middleware/authMiddleware');

router.get('/', (req, res) => {
    res.render('index');
});


router.get('/dashboard', isAuthenticated, reservationController.showDashboard);

module.exports = router;
