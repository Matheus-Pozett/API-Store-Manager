const connection = require('./connection');

const getSales = async () => {
  const sql = `
    SELECT s.id, s.date, sp.product_id, sp.quantity 
    FROM sales AS s
    INNER JOIN sales_products AS sp
    ON s.id = sp.sale_id;
`;

  const [result] = connection.execute(sql);

  return result;
};

module.exports = { getSales };