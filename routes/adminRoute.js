const express = require('express');
const controller = require('../controllers/adminController.js');

const router = express.Router();

router.get('/', controller.admin_index);

module.exports = router;