const express = require('express');
const FoodController = require('../controllers/FoodController');
const FoodSchema = require('../routes/schemas/FoodSchema');

const router = express.Router({ mergeParams: true });

/* GET /food */
router.get('/', FoodSchema.list, FoodController.list);

module.exports = router;
