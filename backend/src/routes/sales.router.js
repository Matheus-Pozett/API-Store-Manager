const { Router } = require('express');
const { salesController } = require('../controllers');
const { validateNewSales, validateUpdateSaleProduct } = require('../middlewares/sales.middleware');

const router = Router();

router.get('/', salesController.getSales);
router.get('/:id', salesController.getSalesById);
router.post('/', validateNewSales, salesController.createSale);
router.delete('/:id', salesController.deleteSale);
router.put(
  '/:saleId/products/:productId/quantity', 
  validateUpdateSaleProduct, 
  salesController.updateSaleProductQuantity,
);

module.exports = router;
