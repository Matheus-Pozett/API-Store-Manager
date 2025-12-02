const { Router } = require('express');
const { salesController } = require('../controllers');

const router = Router();

router.get('/', salesController.getSales);
router.get('/:id');

module.exports = router;
