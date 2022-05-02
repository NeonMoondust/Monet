const express = require('express');
const controller = require('../controllers/productsController.js');

const router = express.Router();

router.get('/', controller.products_index);

module.exports = router;