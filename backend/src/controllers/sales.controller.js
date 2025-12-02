const { salesService } = require('../services');
const mapStatusHTTP = require('../utils/mapStatusHTTP');

const getSales = async (_req, res) => {
  const { data, status } = await salesService.getSales();
  return res.status(mapStatusHTTP(status)).json(data);
};

const getSalesById = async (req, res) => {
  const id = Number(req.params.id);
  const { data, status } = await salesService.getSalesById(id);
  return res.status(mapStatusHTTP(status)).json(data);
};

module.exports = { getSales, getSalesById };