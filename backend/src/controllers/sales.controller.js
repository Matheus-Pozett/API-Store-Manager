const { salesService } = require('../services');
const mapStatusHTTP = require('../utils/mapStatusHTTP');

const getSales = async (req, res) => {
  const { data, status } = await salesService.getSales();
  return res.status(mapStatusHTTP(status)).json(data);
};

module.exports = { getSales };