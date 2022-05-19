const express = require('express');
const controller = require('../controllers/loginController.js');

const router = express.Router();

router.get('/', controller.login_index);
router.post('/signin', controller.login_signin);

module.exports = router;