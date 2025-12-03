const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const productModel = require('../../../src/models/product.model');
const productService = require('../../../src/services/product.service');
const { mockAllProducts, mockProductsById } = require('../models/mocks/mocksProduct');

const { expect } = chai;

chai.use(sinonChai);

describe('PRODUCT SERVICE', function () {
  afterEach(function () {
    sinon.restore();
  });

  it('Retorna a lista completa de produto', async function () {
    // Arrange
    sinon.stub(productModel, 'getProducts').resolves(mockAllProducts);

    const result = await productService.getProducts();

    expect(result.status).to.be.eq('SUCCESSFUL');
    expect(result.data).to.be.deep.equal(mockAllProducts);
  });

  it('Retorna o produto solicitado quando o ID existe', async function () {
    // Arrange
    const id = 1;

    sinon.stub(productModel, 'getProductById').resolves(mockProductsById);

    const result = await productService.getProductById(id);

    expect(result.status).to.be.eq('SUCCESSFUL');
    expect(result.data).to.be.deep.equal(mockProductsById);
    expect(productModel.getProductById).to.have.been.calledWith(1);
  });

  it('Retorna erro do tipo "NOT_FOUND" quando o produto não existe', async function () {
    // Arrange
    const id = 999;
    sinon.stub(productModel, 'getProductById').resolves(undefined);

    const result = await productService.getProductById(id);

    expect(result.status).to.be.eq('NOT_FOUND');
    expect(result.data).to.be.deep.equal({ message: 'Product not found' });
    expect(productModel.getProductById).to.have.been.calledWith(999);
  });

  it('Retorna status 201 e o produto criado', async function () {
    const product = {
      name: 'Martelo de Thor',
    };

    sinon.stub(productModel, 'findProductByName').resolves(undefined);

    sinon.stub(productModel, 'createProduct').resolves(mockProductsById);

    const result = await productService.createProduct(product);

    expect(result.status).to.be.eq('CREATED');
    expect(result.data).to.be.deep.equal(mockProductsById);
  });

  it('Retorna status 409 e mensagem de produto já existe no banco', async function () {
    const product = {
      name: 'Martelo de Thor',
    };

    sinon.stub(productModel, 'findProductByName').resolves(mockProductsById);

    const result = await productService.createProduct(product);

    expect(result.status).to.be.eq('CONFLICT');
    expect(result.data).to.be.deep.equal({ message: 'Product already exists' });
  });
});