const { Router } = require('express');

const router = Router();

router.get('/');
router.get('/:id');

module.exports = router;
