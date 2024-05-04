const express = require('express');
const router = express.Router();
const documentationController = require('../controllers/documentationController');


router.get('/', documentationController.getApiDocumentation);

module.exports = router;
