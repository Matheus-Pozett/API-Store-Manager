const { productModel } = require('../models');

const getProducts = async () => {
  const allProducts = await productModel.getProducts();

  return { status: 'SUCCESSFUL', data: allProducts };
};

const getProductById = async (id) => {
  const product = await productModel.getProductById(id);

  if (!product) {
    return { status: 'NOT_FOUND', data: { message: 'Product not found' } };
  }

  return { status: 'SUCCESSFUL', data: product };
};

module.exports = { getProducts, getProductById };