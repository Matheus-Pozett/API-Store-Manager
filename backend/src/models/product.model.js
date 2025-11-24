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

module.exports = { getProducts, getProductById };