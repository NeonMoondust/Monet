const express = require('express');
const controller = require('../controllers/rootController.js');

const router = express.Router();

router.get('/', controller.root_index);

module.exports = router;