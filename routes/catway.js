const express = require('express');
const router = express.Router();
const catwayController = require('../controllers/catwayController');

router.get('/', catwayController.getCatwaysPage);
router.get('/:id', catwayController.getCatwayDetailsPage);

router.post('/', catwayController.createCatway);

module.exports = router;
