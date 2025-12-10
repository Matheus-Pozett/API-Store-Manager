const DATE = '2025-12-02T17:08:42.000Z';

const mockAllSales = [
  {
    saleId: 1,
    date: DATE,
    productId: 1,
    quantity: 5,
  },
  {
    saleId: 1,
    date: DATE,
    productId: 2,
    quantity: 10,
  },
  {
    saleId: 2,
    date: DATE,
    productId: 3,
    quantity: 15,
  },
];

const mockSalesById = [
  {
    date: DATE,
    productId: 1,
    quantity: 5,
  },
  {
    date: DATE,
    productId: 2,
    quantity: 10,
  },
];

module.exports = { mockAllSales, mockSalesById };