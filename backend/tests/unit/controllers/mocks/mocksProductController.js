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

const mockServiceResponseSuccessByQuery = {
  status: 'SUCCESSFUL',
  data: [{
    id: 1,
    name: 'Martelo de Thor',
  }],
}; 

const mockServiceResponseNotFound = {
  status: 'NOT_FOUND',
  data: { message: 'Product not found' },
};

const mockServiceResponseCreated = {
  status: 'CREATED',
  data: {
    id: 1,
    name: 'Teste',
  },
};

const mockServiceResponseUpdated = {
  status: 'SUCCESSFUL',
  data: {
    id: 1,
    name: 'testee',
  },
};

const mockServiceResponseProductExist = {
  status: 'CONFLICT',
  data: { message: 'Product already exists' },
};

module.exports = { 
  mockServiceResponseSuccess, 
  mockServiceResponseSuccessById,
  mockServiceResponseNotFound,
  mockServiceResponseCreated,
  mockServiceResponseProductExist, 
  mockServiceResponseUpdated,
  mockServiceResponseSuccessByQuery,
};
