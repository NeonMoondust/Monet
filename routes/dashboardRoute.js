const express = require('express');
const controller = require('../controllers/dashboardController.js');

const router = express.Router();

router.get('/', controller.dashboard_index);

module.exports = router;