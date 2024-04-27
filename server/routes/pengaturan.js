const express = require('express');
const router = express.Router();
const pengaturanController = require('../controllers/pengaturanController');

//untuk autentikasi
const verifyTokenAdmin = require('../middleware/authAdmin');

const upload = require('../middleware/upload');

/**
 * Routing untuk Halaman Pengaturan
 */

router.get('/', verifyTokenAdmin, pengaturanController.halaman_pengaturan);

/**
 * Routing untuk Halaman Pengaturan Pengguna
 */

router.get('/pengguna', verifyTokenAdmin, pengaturanController.pengguna);
router.get('/pengguna/hapus/:id', verifyTokenAdmin, pengaturanController.hapusPengguna);

router.get('/tambah_pengguna', verifyTokenAdmin, pengaturanController.tambah_pengguna_form);
router.post('/pengguna/tambah', verifyTokenAdmin, pengaturanController.tambah_pengguna);

router.get('/ubah_pengguna/:id', verifyTokenAdmin, pengaturanController.ubah_pengguna_form);
router.post('/pengguna/ubah', verifyTokenAdmin, pengaturanController.ubah_pengguna);


/**
 * Routing untuk Halaman Pengaturan Dokter
 */

router.get('/dokter', verifyTokenAdmin, pengaturanController.dokter);
router.get('/dokter/hapus/:id', verifyTokenAdmin, pengaturanController.hapusDokter);

router.get('/tambah_dokter', verifyTokenAdmin, pengaturanController.tambah_dokter_form);
router.post('/dokter/tambah', verifyTokenAdmin, upload.single('file'), pengaturanController.tambah_dokter);

router.get('/ubah_dokter/:id', verifyTokenAdmin, pengaturanController.ubah_dokter_form);
router.post('/dokter/ubah', verifyTokenAdmin, upload.single('file'), pengaturanController.ubah_dokter);

/**
* Routing untuk Halaman Pengaturan Spesialis
*/

router.get('/spesialis', verifyTokenAdmin, pengaturanController.spesialis);
router.get('/spesialis/hapus/:id', verifyTokenAdmin, pengaturanController.hapusSpesialis);

router.get('/tambah_spesialis', verifyTokenAdmin, pengaturanController.tambah_spesialis_form);
router.post('/spesialis/tambah', verifyTokenAdmin, pengaturanController.tambah_spesialis);

router.get('/ubah_spesialis/:id', verifyTokenAdmin, pengaturanController.ubah_spesialis_form);
router.post('/spesialis/ubah', verifyTokenAdmin, pengaturanController.ubah_spesialis);


/**
* Routing untuk Halaman Pengaturan Jadwal Dokter
*/

router.get('/jadwal_dokter', verifyTokenAdmin, pengaturanController.jadwal_dokter);
router.get('/jadwal_dokter/hapus/:id', verifyTokenAdmin, pengaturanController.hapusJadwalDokter);

router.get('/tambah_jadwal_dokter', verifyTokenAdmin, pengaturanController.tambah_jadwal_dokter_form);
router.post('/jadwal_dokter/tambah', verifyTokenAdmin, pengaturanController.tambah_jadwal_dokter);

router.get('/ubah_jadwal_dokter/:id', verifyTokenAdmin, pengaturanController.ubah_jadwal_dokter_form);
router.post('/jadwal_dokter/ubah', verifyTokenAdmin, pengaturanController.ubah_jadwal_dokter);

router.get('/reservasi', verifyTokenAdmin, pengaturanController.reservasi);
router.get('/reservasi/hapus/:id', verifyTokenAdmin, pengaturanController.hapusReservasi);
router.get('/ubah_reservasi/:id', verifyTokenAdmin, pengaturanController.ubah_reservasi_form);
router.post('/reservasi/ubah', verifyTokenAdmin, pengaturanController.ubah_reservasi);

module.exports = router;