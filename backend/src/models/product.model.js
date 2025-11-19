const connection = require('./connection');

const getProducts = async () => {
  const [result] = await connection.execute('SELECT * FROM StoreManager.products');

  return result;
};

const getProductById = async (id) => {
  const query = 'SELECT * FROM StoreManager.products WHERE id = ?';
  const [[result]] = await connection.execute(query, [id]);

  return result;
};

module.exports = { getProducts, getProductById };