const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');


router.get('/', (req, res) => {
  res.render('index');
});

router.post('/login', authController.login);

module.exports = router;
