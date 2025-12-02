const mockServiceResponseSuccess = {
  status: 'SUCCESSFUL',
  data: [
    {
      id: 1,
      name: 'Martelo de Thor',
    },
    {
      id: 2,
      name: 'Traje de encolhimento',
    },
    {
      id: 3,
      name: 'Escudo do CapitÃ£o AmÃ©rica',
    },
  ],
};

const mockServiceResponseSuccessById = {
  status: 'SUCCESSFUL',
  data: {
    id: 1,
    name: 'Martelo de Thor',
  },
}; 

const mockServiceResponseNotFound = {
  status: 'NOT_FOUND',
  data: { message: 'Product not found' },
}; 

module.exports = { 
  mockServiceResponseSuccess, 
  mockServiceResponseSuccessById,
  mockServiceResponseNotFound, 
};
