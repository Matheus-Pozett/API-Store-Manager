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

const createProduct = async (req, res) => {
  const product = req.body;
  const { data, status } = await productService.createProduct(product);

  res.status(mapStatusHTTP(status)).json(data);
};

const deleteProduct = async (req, res) => {
  const id = Number(req.params.id);
  const { data, status } = await productService.deleteProduct(id);

  res.status(mapStatusHTTP(status)).json(data);
};

const updateProduct = async (req, res) => {
  const id = Number(req.params.id);
  const { name } = req.body;
  const { data, status } = await productService.updateProduct({ id, name });

  res.status(mapStatusHTTP(status)).json(data);
};

module.exports = { getProducts, 
  getProductById, 
  createProduct, 
  deleteProduct,
  updateProduct,
};