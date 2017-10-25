const express = require('express');

const AuthMiddleware = require('../middlewares/Auth');
const UserController = require('../controllers/UserController');
const UserSchema = require('../routes/schemas/UserSchema');

const router = express.Router({ mergeParams: true });

/* GET /users/me */
router.get('/me', AuthMiddleware.hasCredentials, AuthMiddleware.identifyUser, UserController.get);

/* GET /users/:username */
router.get('/:username', UserSchema.getByUsername, UserController.getByUsername);

/* GET /users/:username/favorites */
router.get('/:username/favorites', AuthMiddleware.hasCredentials, AuthMiddleware.identifyUser, UserSchema.getByUsername, UserController.getFavorites);

/* POST /users */
router.post('/', UserSchema.post, UserController.post);

/* PUT /user/:userId */
router.put('/:userId', AuthMiddleware.hasCredentials, AuthMiddleware.identifyUser, UserSchema.put, UserController.put);

module.exports = router;

