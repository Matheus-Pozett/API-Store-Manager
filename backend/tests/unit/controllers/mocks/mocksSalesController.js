const DATE = '2025-12-02T17:08:42.000Z';

const mockServiceResponseSuccess = {
  status: 'SUCCESSFUL',
  data: [
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
  ],
};

const mockServiceResponseSuccessById = {
  status: 'SUCCESSFUL',
  data: [
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
  ],
}; 

const mockServiceResponseNotFound = {
  status: 'NOT_FOUND',
  data: { message: 'Sale not found' },
};

const mockCreatedSales = {
  status: 'CREATED',
  data: {
    id: 15,
    itemsSold: [
      {
        productId: 1,
        quantity: 1,
      },
      {
        productId: 2,
        quantity: 5,
      },
    ],
  },
};

module.exports = { 
  mockServiceResponseSuccess, 
  mockServiceResponseSuccessById,
  mockServiceResponseNotFound,
  mockCreatedSales,
};