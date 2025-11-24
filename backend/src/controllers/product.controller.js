const { productService } = require('../services');
const mapStatusHTTP = require('../utils/mapStatusHTTP');

const getProducts = async (_req, res) => {
  const { status, data } = await productService.getProducts();

  res.status(mapStatusHTTP(status)).json(data);
};

const getProductById = async (req, res) => {
  const id = Number(req.params.id);
  const { data, status } = await productService.getProductById(id);

  res.status(mapStatusHTTP(status)).json(data);
};

module.exports = { getProducts, getProductById };