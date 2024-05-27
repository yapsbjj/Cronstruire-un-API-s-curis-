const express = require('express');
const router = express.Router();
const catwayController = require('../controllers/catwayController'); 
const { isAuthenticated } = require('../middleware/authMiddleware');


router.post('/', isAuthenticated, catwayController.createCatway);

module.exports = router;







module.exports = router;
