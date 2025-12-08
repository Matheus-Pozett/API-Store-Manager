const { Router } = require('express');
const { salesController } = require('../controllers');
const { validateNewSales } = require('../middlewares/sales.middleware');

const router = Router();

router.get('/', salesController.getSales);
router.get('/:id', salesController.getSalesById);
router.post('/', validateNewSales, salesController.createSale);

module.exports = router;
