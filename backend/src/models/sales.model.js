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
  const { productId, quantity } = sales;
  const id = createSales();

  const sql = `
    INSERT INTO sales_products (sale_id, product_id, quantity)
    VALUES (?, ?, ?);
  `;

  const [result] = await connection.execute(sql, [id, productId, quantity]);

  const newSale = {
    id,
    itemsSold: result,
  };

  return newSale;
};

module.exports = { getSales, getSalesById, createSalesProducts };