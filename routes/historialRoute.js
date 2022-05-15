const express = require('express');
const controller = require('../controllers/historialController.js');

const router = express.Router();

router.get('/', controller.historial_index);

module.exports = router;