const express = require('express');
const { productController } = require('../controllers');
const { validateNewProduct } = require('../middlewares/product.middleware');

const router = express.Router();

router.get('/', productController.getProducts);

router.get('/:id', productController.getProductById);

router.post('/', validateNewProduct, productController.createProduct);

router.put('/:id', validateNewProduct, productController.updateProduct);

router.delete('/:id', productController.deleteProduct);

module.exports = router;