const express = require('express');
const controller = require('../controllers/productsController.js');

const router = express.Router();

router.get('/', controller.products_verify, controller.products_index);
router.post('/crear', controller.products_verify, controller.products_crear);
router.put('/editar', controller.products_verify, controller.products_editar);

module.exports = router;