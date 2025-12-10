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

const deleteSale = async (id) => {
  const itemsDeleted = await salesModel.deleteSales(id);

  if (itemsDeleted === 0) {
    return { status: 'NOT_FOUND', data: { message: 'Sale not found' } };
  }

  return { status: 'NO_CONTENT' };
};

const updateSaleProductQuantity = async (saleId, productId, quantity) => {
  const saleExists = await salesModel.getSalesById(saleId); 
  if (!saleExists || saleExists.length === 0) {
    return { status: 'NOT_FOUND', data: { message: 'Sale not found' } };
  }

  const productInSale = await salesModel.getSaleProduct(saleId, productId);
  if (!productInSale || productInSale.length === 0) {
    return { status: 'NOT_FOUND', data: { message: 'Product not found in sale' } };
  }
  
  await salesModel.updateSaleProductQuantity(saleId, productId, quantity);
  
  const updatedSale = {
    date: saleExists[0].date, 
    productId: Number(productId),
    quantity,
    saleId: Number(saleId),
  };

  return { status: 'SUCCESSFUL', data: updatedSale };
};

module.exports = { getSales, getSalesById, createSales, deleteSale, updateSaleProductQuantity };