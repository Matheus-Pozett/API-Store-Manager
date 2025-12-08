const camelize = require('camelize');
const connection = require('./connection');

const getSales = async () => {
  const sql = `
    SELECT sp.sale_id, s.date,  sp.product_id, sp.quantity  
    FROM sales AS s
    INNER JOIN sales_products AS sp
    ON s.id = sp.sale_id
    ORDER BY sp.sale_id ASC, sp.product_id ASC;
`;

  const [result] = await connection.execute(sql);

  return camelize(result);
};

const getSalesById = async (id) => {
  const sql = `
    SELECT s.date, sp.product_id, sp.quantity 
    FROM sales AS s
    INNER JOIN sales_products AS sp
    ON s.id = sp.sale_id
    WHERE s.id = ?
    ORDER BY sp.sale_id ASC, sp.product_id ASC;
`;

  const [result] = await connection.execute(sql, [id]);

  return camelize(result);
};

const createSales = async () => {
  const sql = 'INSERT INTO sales (date) VALUES (NOW())';
  const [{ insertId }] = await connection.execute(sql);

  return insertId;
};

const createSalesProducts = async (sales) => {
  const { saleId, productId, quantity } = sales;

  const sql = `
    INSERT INTO sales_products (sale_id, product_id, quantity)
    VALUES (?, ?, ?);
  `;

  await connection.execute(sql, [saleId, productId, quantity]);
};

const deleteSales = async (id) => {
  const sql = 'DELETE FROM sales WHERE id = ?';
  const [{ affectedRows }] = await connection.execute(sql, [id]);

  return affectedRows;
};

module.exports = { 
  getSales, 
  getSalesById,
  createSales,
  createSalesProducts,
  deleteSales, 
};