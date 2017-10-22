const express = require('express');
const SearchController = require('../controllers/SearchController');
const SearchSchema = require('../routes/schemas/SearchSchema');

const router = express.Router({ mergeParams: true });

/* GET /search */
router.get('/:source', SearchSchema.list, SearchController.list);

module.exports = router;
