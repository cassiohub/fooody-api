const express = require('express');

const router = express.Router({ mergeParams: true });

const AuthMiddleware = require('../middlewares/Auth');
const FavoriteSchema = require('./schemas/FavoriteSchema');
const FavoriteController = require('../controllers/FavoriteController');

router.use(AuthMiddleware.hasCredentials, AuthMiddleware.identifyUser);

/* GET /favorites */
router.route('/')
  .get(FavoriteSchema.list, FavoriteController.list)
  .post(FavoriteSchema.post, FavoriteController.post);

/* GET /favorites/:favoriteId */
router.route('/:favoriteId')
  .get(FavoriteSchema.get, FavoriteController.get)
  .put(FavoriteSchema.put, FavoriteController.put)
  .delete(FavoriteSchema.delete, FavoriteController.delete);

module.exports = router;
