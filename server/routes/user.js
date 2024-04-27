const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

//untuk autentikasi
const verifyToken = require('../middleware/auth');

/**
 * Routing untuk Auntentikasi
 */

router.get('/', verifyToken, userController.beranda);
router.get('/logout', userController.logout);
router.get('/login', userController.login);
router.post('/cek-login', userController.cek_login);
router.get('/registrasi', userController.registrasi);
router.post('/cek-registrasi', userController.cek_registrasi);

router.get('/kontak', verifyToken, userController.kontak);
router.get('/profil', verifyToken, userController.profil);
router.post('/ubah-profil', verifyToken, userController.ubah_profil);
router.get('/reservasi-dokter/:id', verifyToken, userController.reservasi_dokter_chatbot);

module.exports = router;