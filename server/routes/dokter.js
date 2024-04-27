const express = require('express');
const router = express.Router();
const dokterController = require('../controllers/dokterController');

//untuk autentikasi
const verifyToken = require('../middleware/auth');

/**
 * Routing untuk Auntentikasi
 */
router.get('/halaman-dokter', verifyToken, dokterController.halaman_dokter);
router.get('/dokter', verifyToken, dokterController.dokter);
router.get('/dokter/:id', verifyToken, dokterController.halaman_dokter_detail);
router.post('/cari-dokter', verifyToken, dokterController.cari_dokter);
router.get('/histori', verifyToken, dokterController.histori_reservasi);

router.get('/halaman-jadwal-dokter', verifyToken, dokterController.halaman_jadwal_dokter);
router.get('/jadwal-dokter', verifyToken, dokterController.jadwal_dokter);
router.post('/cari-jadwal', verifyToken, dokterController.cari_jadwal);

router.post('/reservasi/:id/pengguna', verifyToken, dokterController.reservasi_dokter_pengguna);
router.get('/reservasi/:id/batal', verifyToken, dokterController.batal_reservasi);

module.exports = router;