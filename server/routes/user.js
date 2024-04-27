const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');


/**
 * Routing untuk Auntentikasi
 */

router.get('/login', userController.login);
router.get('/registrasi', userController.registrasi);


module.exports = router;