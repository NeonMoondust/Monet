const express = require('express');
const controller = require('../controllers/usuariosController.js');

const router = express.Router();

router.get('/', controller.usuarios_index);

module.exports = router;