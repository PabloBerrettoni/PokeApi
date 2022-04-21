const express = require('express');
const router = express.Router();
const controller = require('../controllers/indexController');

router.get('/', controller.homeView);
router.get('/:offsetValue', controller.homeViewOffset);

module.exports = router;