const { salesModel } = require('../models');

const getSales = async () => {
  const sales = await salesModel.getSales();

  return { status: 'SUCCESSFUL', data: sales };
};

module.exports = { getSales };