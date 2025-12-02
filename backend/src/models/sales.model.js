const camelize = require('camelize');
const connection = require('./connection');

const getSales = async () => {
  const sql = `
    SELECT sp.sale_id, s.date,  sp.product_id, sp.quantity  
    FROM sales AS s
    INNER JOIN sales_products AS sp
    ON s.id = sp.sale_id;
`;

  const [result] = await connection.execute(sql);

  return camelize(result);
};

module.exports = { getSales };