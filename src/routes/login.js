const express = require('express');
const LoginController = require('../controllers/LoginController');
const LoginSchema = require('../routes/schemas/LoginSchema');

const router = express.Router({ mergeParams: true });

/* POST /login */
router.post('/', LoginSchema.post, LoginController.authenticate);

module.exports = router;
