const connection = require('./connection');

const getProducts = async () => {
  const [result] = await connection.execute('SELECT * FROM products');

  return result;
};

const getProductById = async (id) => {
  const query = 'SELECT * FROM products WHERE id = ?';
  const [[result]] = await connection.execute(query, [id]);
  return result;
};

const findProductByName = async (name) => {
  const sql = 'SELECT * FROM products WHERE name = ?';
  const [[result]] = await connection.execute(sql, [name]);
  return result;
};

const createProduct = async (product) => {
  const { name } = product;
  const sql = 'INSERT INTO products (name) VALUES (?)';
  const [result] = await connection.execute(sql, [name]);

  return result;
};

module.exports = { 
  getProducts, 
  getProductById,
  createProduct,
  findProductByName, 
};