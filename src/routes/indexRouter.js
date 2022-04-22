const express = require('express');
const router = express.Router();
const controller = require('../controllers/indexController');

router.get('/', controller.homeView);
router.get('/:offsetValue', controller.homeViewOffset);
router.get('/search/:searchParams', controller.searchController)

module.exports = router;