const express = require('express');
const controller = require('../controllers/pendientesController.js');

const router = express.Router();

router.get('/', controller.pendientes_verify, controller.pendientes_index);
router.put('/finalizar', controller.pendientes_verify, controller.pendientes_finish);
router.put('/cancelar', controller.pendientes_verify, controller.pendientes_cancel);

module.exports = router;