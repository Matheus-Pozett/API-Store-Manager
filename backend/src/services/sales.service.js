const { salesModel } = require('../models');

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

module.exports = { getSales, getSalesById };