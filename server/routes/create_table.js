const express = require('express');
const router = express.Router();
const createTableController = require('../controllers/createTableController');

/**
 * Routing untuk Create Table
 */

router.get('/user', createTableController.user);
router.get('/dokter', createTableController.dokter);
router.get('/spesialis', createTableController.spesialis);
router.get('/jadwal_dokter', createTableController.jadwal_dokter);


module.exports = router;