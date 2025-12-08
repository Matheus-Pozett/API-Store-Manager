const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const { 
  mockServiceResponseSuccess, 
  mockServiceResponseSuccessById, 
  mockServiceResponseNotFound, 
  mockServiceResponseCreated,
  mockServiceResponseProductExist, 
} = require('./mocks/mocksProductController');
const { productService } = require('../../../src/services/index');
const { productController } = require('../../../src/controllers/index');
  
const { expect } = chai;

chai.use(sinonChai);

describe('PRODUCT CONTROLLER', function () {
  afterEach(function () {
    sinon.restore();
  });

  it('Deve retornar o status 200 e a lista de produtos', async function () {
    // Arrange
    const req = {};
    const res = {
      status: sinon.stub().returnsThis(), // O uso do returnThis serve para que o json pode ser chamado logo após o .status()
      json: sinon.stub(),
    };

    sinon.stub(productService, 'getProducts').resolves(mockServiceResponseSuccess);

    await productController.getProducts(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(mockServiceResponseSuccess.data);
  });

  it('Deve retornar o status 200 e busca produto pelo ID', async function () {
    // Arrange
    const req = {
      params: { id: 1 },
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    sinon.stub(productService, 'getProductById').resolves(mockServiceResponseSuccessById);

    // Act
    await productController.getProductById(req, res);

    // Assert
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(mockServiceResponseSuccessById.data);
    expect(productService.getProductById).to.have.been.calledWith(1);
  });

  it('Se não existir um produto retorna 404', async function () {
    // Arrange

    const req = {
      params: { id: 999 },
    };
    
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    sinon.stub(productService, 'getProductById').resolves(mockServiceResponseNotFound);

    // Act

    await productController.getProductById(req, res);

    // Assert
    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith(mockServiceResponseNotFound.data);
    expect(productService.getProductById).to.have.been.calledWith(999);
  });

  it('Cadastra produto com sucesso e retorna statusCode 201', async function () {
    // Arrange

    const req = {
      body: { name: 'Teste' },
    };
    
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    sinon.stub(productService, 'createProduct').resolves(mockServiceResponseCreated);

    // Act

    await productController.createProduct(req, res);

    // Assert

    expect(res.status).to.have.been.calledWith(201);
    expect(res.json).to.have.been.calledWith(mockServiceResponseCreated.data);
  });

  it('Não cadastra produto que já existe e retorna statusCode 409', async function () {
    // Arrange

    const req = {
      body: { name: 'Teste' },
    };
    
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    sinon.stub(productService, 'createProduct').resolves(mockServiceResponseProductExist);

    // Act

    await productController.createProduct(req, res);

    // Assert
    expect(res.status).to.have.been.calledWith(409);
    expect(res.json).to.have.been.calledWith(mockServiceResponseProductExist.data);
  });

  it('Deleta produto e retorna httpStatus 204 sem body', async function () {
    // Arrange
    const req = {
      params: { id: 1 },
    };
    
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    sinon.stub(productService, 'deleteProduct').resolves({ status: 'NO_CONTENT', data: undefined });

    // Act

    await productController.deleteProduct(req, res);

    // Assert
    expect(res.status).to.have.been.calledWith(204);
    expect(res.json).to.have.been.calledWith(undefined);
  });

  it('Retorna not found caso não exista produto para deletar', async function () {
    // Arrange
    const req = {
      params: { id: 1 },
    };
    
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    sinon.stub(productService, 'deleteProduct').resolves(mockServiceResponseNotFound);

    // Act

    await productController.deleteProduct(req, res);

    // Assert
    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith(mockServiceResponseNotFound.data);
  });
});