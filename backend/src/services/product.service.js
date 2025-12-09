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

const createProduct = async (product) => {
  const existingProduct = await productModel.findProductByName(product.name);

  if (existingProduct) {
    return { status: 'CONFLICT', data: { message: 'Product already exists' } };
  }

  const result = await productModel.createProduct(product);

  return { status: 'CREATED', data: result };
};

const deleteProduct = async (id) => {
  const itemsDeleted = await productModel.deleteProduct(id);

  if (itemsDeleted === 0) {
    return { status: 'NOT_FOUND', data: { message: 'Product not found' } };
  }

  return { status: 'NO_CONTENT' };
};

const updateProduct = async (product) => {
  const itemUpdate = await productModel.updateProduct(product);
  
  if (itemUpdate === 0) {
    return { status: 'NOT_FOUND', data: { message: 'Product not found' } };
  }

  const productUpdated = {
    id: product.id,
    name: product.name,
  };

  return { status: 'SUCCESSFUL', data: productUpdated };
};

module.exports = { getProducts, 
  getProductById, 
  createProduct,
  deleteProduct,
  updateProduct,
};