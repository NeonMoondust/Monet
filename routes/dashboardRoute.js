const express = require('express');
const controller = require('../controllers/dashboardController.js');

const router = express.Router();

router.get('/', controller.dashboard_verify, controller.dashboard_index);
router.put('/addProduct', controller.dashboard_verify, controller.dashboard_addProduct);

module.exports = router;