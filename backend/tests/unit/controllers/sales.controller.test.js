const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const { 
  mockServiceResponseSuccess, 
  mockServiceResponseSuccessById, 
  mockServiceResponseNotFound,
  mockCreatedSales, 
} = require('./mocks/mocksSalesController');
const { salesService } = require('../../../src/services/index');
const { salesController } = require('../../../src/controllers/index');
  
const { expect } = chai;

chai.use(sinonChai);

describe('SALES CONTROLLER', function () {
  afterEach(function () {
    sinon.restore();
  });

  it('Retorna statusCode 200 e a lista de vendas', async function () {
    const req = {};
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    sinon.stub(salesService, 'getSales').resolves(mockServiceResponseSuccess);

    await salesController.getSales(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(mockServiceResponseSuccess.data);
  });

  it('Retorna statusCode 200 e a lista de vendas por ID', async function () {
    const req = {
      params: { id: 1 },
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    sinon.stub(salesService, 'getSalesById').resolves(mockServiceResponseSuccessById);

    await salesController.getSalesById(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(mockServiceResponseSuccessById.data);
    expect(salesService.getSalesById).to.have.been.calledWith(1);
  });

  it('Retorna statusCode 404 e a mensagem de sale not found ao não encontrar venda por ID', async function () {
    const req = {
      params: { id: 999 },
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    sinon.stub(salesService, 'getSalesById').resolves(mockServiceResponseNotFound);

    await salesController.getSalesById(req, res);

    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith(mockServiceResponseNotFound.data);
    expect(salesService.getSalesById).to.have.been.calledWith(999);
  });

  it('Retorna statusCode 201 e venda cadastrada', async function () {
    const req = {
      body: [
        {
          productId: 1,
          quantity: 1,
        },
        {
          productId: 2,
          quantity: 5,
        },
      ],
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    sinon.stub(salesService, 'createSales').resolves(mockCreatedSales);

    await salesController.createSale(req, res);

    expect(res.status).to.have.been.calledWith(201);
    expect(res.json).to.have.been.calledWith(mockCreatedSales.data);
  });

  it('Retorna statusCode 404 e mensagem produto não encontrado', async function () {
    const req = {
      body: [
        {
          productId: 999,
          quantity: 1,
        },
      ],
    };

    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    sinon.stub(salesService, 'createSales').resolves(mockServiceResponseNotFound);

    await salesController.createSale(req, res);

    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith(mockServiceResponseNotFound.data);
  });

  it('Deleta venda e retorna httpStatus 204 sem body', async function () {
    // Arrange
    const req = {
      params: { id: 1 },
    };
    
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    sinon.stub(salesService, 'deleteSale').resolves({ status: 'NO_CONTENT', data: undefined });

    // Act

    await salesController.deleteSale(req, res);

    // Assert
    expect(res.status).to.have.been.calledWith(204);
    expect(res.json).to.have.been.calledWith(undefined);
  });

  it('Retorna not found caso não exista venda para deletar', async function () {
    // Arrange
    const req = {
      params: { id: 1 },
    };
    
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    sinon.stub(salesService, 'deleteSale').resolves(mockServiceResponseNotFound);

    // Act
    await salesController.deleteSale(req, res);

    // Assert
    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith(mockServiceResponseNotFound.data);
  });

  it('Retorna status 200 e o item atualizado com sucesso', async function () {
    // Arrange
    const req = {
      params: { saleId: 1, productId: 2 },
      body: { quantity: 20 },
    };

    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    const mockServiceResponse = {
      status: 'SUCCESSFUL',
      data: {
        saleId: 1,
        productId: 2,
        quantity: 20,
        date: '2023-05-06T03:14:28.000Z',
      },
    };

    sinon.stub(salesService, 'updateSaleProductQuantity').resolves(mockServiceResponse);

    // Act
    await salesController.updateSaleProductQuantity(req, res);

    // Assert
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(mockServiceResponse.data);
  });

  it('Retorna status 404 e mensagem de erro quando a venda não é encontrada', async function () {
    const req = {
      params: { saleId: 999, productId: 2 },
      body: { quantity: 20 },
    };

    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    const mockServiceError = {
      status: 'NOT_FOUND',
      data: { message: 'Sale not found' },
    };

    sinon.stub(salesService, 'updateSaleProductQuantity').resolves(mockServiceError);

    await salesController.updateSaleProductQuantity(req, res);

    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith(mockServiceError.data);
  });

  it('Retorna status 404 e mensagem de erro quando o produto não existe na venda', async function () {
    const req = {
      params: { saleId: 1, productId: 999 },
      body: { quantity: 20 },
    };

    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    const mockServiceError = {
      status: 'NOT_FOUND',
      data: { message: 'Product not found in sale' },
    };

    sinon.stub(salesService, 'updateSaleProductQuantity').resolves(mockServiceError);

    await salesController.updateSaleProductQuantity(req, res);

    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith(mockServiceError.data);
  });
});