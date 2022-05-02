const express = require('express');
const controller = require('../controllers/pendientesController.js');

const router = express.Router();

router.get('/', controller.pendientes_index);

module.exports = router;