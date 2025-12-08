const { salesModel, productModel } = require('../models');

const getSales = async () => {
  const sales = await salesModel.getSales();

  return { status: 'SUCCESSFUL', data: sales };
};

const getSalesById = async (id) => {
  const sales = await salesModel.getSalesById(id);

  if (sales.length === 0) {
    return { status: 'NOT_FOUND', data: { message: 'Sale not found' } };
  }

  return { status: 'SUCCESSFUL', data: sales };
};

const createSales = async (sales) => {
  const checkPromises = sales.map((item) => productModel.getProductById(item.productId));
  const productsFound = await Promise.all(checkPromises);

  if (productsFound.some((product) => !product)) {
    return { status: 'NOT_FOUND', data: { message: 'Product not found' } };
  }
  
  const saleId = await salesModel.createSales();
  const saleProduct = sales.map((sale) => 
    salesModel.createSalesProducts({ saleId, ...sale }));

  await Promise.all(saleProduct);
  
  return { status: 'CREATED', data: { id: saleId, itemsSold: sales } };
};

module.exports = { getSales, getSalesById, createSales };