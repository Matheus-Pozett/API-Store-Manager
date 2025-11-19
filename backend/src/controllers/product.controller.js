const { productModel } = require('../models');
const mapStatusHTTP = require('../utils/mapStatusHTTP');

const getProducts = async (_req, res) => {
  const products = await productModel.getProducts();

  res.status(200).json(products);
};

const getProductById = async (req, res) => {
  const id = Number(req.params.id);
  const product = await productModel.getProductById(id);

  if (!product) {
    return res.status(mapStatusHTTP('NOT_FOUND')).json({ message: 'Product not found' });
  }

  res.status(200).json(product);
};

module.exports = { getProducts, getProductById };