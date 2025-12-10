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

  it('Retorna status 204 para caso de produto deletado com sucesso', async function () {
    const id = 1;

    sinon.stub(productModel, 'deleteProduct').resolves(1);

    const result = await productService.deleteProduct(id);

    expect(result.status).to.be.eq('NO_CONTENT');
    expect(result.data).to.be.eq(undefined);
  });

  it('Retorna status 404 para caso produto não seja encontrado ao tentar deletar', async function () {
    const id = 1;

    sinon.stub(productModel, 'deleteProduct').resolves(0);

    const result = await productService.deleteProduct(id);

    expect(result.status).to.be.eq('NOT_FOUND');
    expect(result.data).to.be.deep.equal({ message: 'Product not found' });
  });

  it('Retorna status 200 e o novo produto atualizado', async function () {
    const product = {
      id: 1,
      name: 'productX',
    };

    sinon.stub(productModel, 'updateProduct').resolves(1);

    const result = await productService.updateProduct(product);

    expect(result.status).to.be.eq('SUCCESSFUL');
    expect(result.data).to.be.deep.equal(product);
  });

  it('Retorna status 404 e mensagem de produto não encontrado no caso de não existir um produto para atualizar', async function () {
    const product = {
      id: 99,
      name: 'productX',
    };

    sinon.stub(productModel, 'updateProduct').resolves(0);

    const result = await productService.updateProduct(product);

    expect(result.status).to.be.eq('NOT_FOUND');
    expect(result.data).to.be.deep.equal({ message: 'Product not found' });
  });

  it('Retorna status 200 e o produto buscado pela query', async function () {
    const q = 'martelo';

    sinon.stub(productModel, 'searchProductByQuery').resolves([mockProductsById]);

    const result = await productService.searchProductByQuery(q);

    expect(result.status).to.be.eq('SUCCESSFUL');
    expect(result.data).to.be.deep.equal([mockProductsById]);
  });

  it('Retorna status 200 e um array vazio caso não encontre nenhum produto via query', async function () {
    const q = 'aaaasd';

    sinon.stub(productModel, 'searchProductByQuery').resolves([]);

    const result = await productService.searchProductByQuery(q);

    expect(result.status).to.be.eq('SUCCESSFUL');
    expect(result.data).to.be.deep.equal([]);
  });

  it('Se query for undefined chama a função getProducts', async function () {
    const q = undefined;

    sinon.stub(productModel, 'getProducts').resolves(mockAllProducts);

    const result = await productService.searchProductByQuery(q);

    expect(result.status).to.be.eq('SUCCESSFUL');
    expect(result.data).to.be.deep.equal(mockAllProducts);
  });
});