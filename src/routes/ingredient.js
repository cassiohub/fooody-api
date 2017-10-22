const express = require('express');

const router = express.Router({ mergeParams: true });

const AuthMiddleware = require('../middlewares/Auth');
const IngredientSchema = require('./schemas/IngredientSchema');
const IngredientController = require('../controllers/IngredientController');

router.use(AuthMiddleware.hasCredentials, AuthMiddleware.identifyUser);

/* GET /ingredients */
router.route('/')
  .get(IngredientSchema.list, IngredientController.list)
  .post(IngredientSchema.post, IngredientController.post);

/* GET /ingredients/:ingredientId */
router.route('/:ingredientId')
  .get(IngredientSchema.get, IngredientController.get)
  .put(IngredientSchema.put, IngredientController.put)
  .delete(IngredientSchema.delete, IngredientController.delete);

router.route('/:ingredientId/:status')
  .get(IngredientSchema.status, IngredientController.status);

module.exports = router;
