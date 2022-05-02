const express = require('express');
const controller = require('../controllers/loginController.js');

const router = express.Router();

router.get('/', controller.login_index);
// router.get('/loginIn', controller.login_loginIn);

module.exports = router;