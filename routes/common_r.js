const express = require('express');
const router = express.Router();
const common_c = require('../controllers/common_c');


// get single value
router.get('/:table/:field/:value', common_c.getSingle);

router.delete('/:table/:field/:value', common_c.delete);


module.exports = router;