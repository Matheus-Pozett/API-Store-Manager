const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const connection = require('../../../src/models/connection');
const productModel = require('../../../src/models/product.model');
const { mockAllProducts, mockProductsById } = require('./mocks');

const { expect } = chai;

chai.use(sinonChai);

describe('PRODUCT MODEL', function () {
  afterEach(function () {
    sinon.restore();
  });

  it('Recupera a lista de produtos com sucesso', async function () {
    // Arrange
    sinon.stub(connection, 'execute').resolves([mockAllProducts, []]);
    // Act
    const result = await productModel.getProducts(); 
    // Assert
    expect(result).to.be.eq(mockAllProducts);
  });

  it('Recupera um produto a partir do seu id com sucesso', async function () {
    // Arrange
    const id = 1;

    sinon.stub(connection, 'execute').resolves([[mockProductsById], []]);

    // Act
    const result = await productModel.getProductById(id);

    // Assert
    expect(result).to.be.eq(mockProductsById);
  });

  it('Retorna undefined caso não encontre um produto pelo ID', async function () {
    const id = 999;

    sinon.stub(connection, 'execute').resolves([[], []]);

    const result = await productModel.getProductById(id);

    expect(result).to.be.eq(undefined);
  });
});