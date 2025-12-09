const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const connection = require('../../../src/models/connection');
const productModel = require('../../../src/models/product.model');
const { mockAllProducts, mockProductsById } = require('./mocks/mocksProduct');

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

  it('Cadastra produto com sucesso', async function () {
    const product = {
      name: 'productX',
    };

    sinon.stub(connection, 'execute').resolves([{ insertId: 1 }]);

    const result = await productModel.createProduct(product);

    expect(result).to.be.deep.equal({ id: 1, name: 'productX' });
  });

  it('Retorna o produto caso já exista no banco', async function () {
    const name = 'teste';
    sinon.stub(connection, 'execute').resolves([[{ id: 1, name }], []]);

    const result = await productModel.findProductByName(name);
    
    expect(result).to.be.deep.equal({ id: 1, name: 'teste' });
  });

  it('Retorna undefined caso não exista o produto no banco', async function () {
    const name = 'teste';
    sinon.stub(connection, 'execute').resolves([[], []]);

    const result = await productModel.findProductByName(name);

    expect(result).to.be.eq(undefined);
  });

  it('Deleta um produto do banco de dados', async function () {
    const id = 1;
    sinon.stub(connection, 'execute').resolves([{ affectedRows: 1 }, []]);

    const result = await productModel.deleteProduct(id);

    expect(result).to.be.eq(1);
  });

  it('Não deleta um produto do banco de dados', async function () {
    const id = 1;
    sinon.stub(connection, 'execute').resolves([{ affectedRows: 0 }, []]);

    const result = await productModel.deleteProduct(id);

    expect(result).to.be.eq(0);
  });

  it('Atualiza produto com sucesso', async function () {
    const product = {
      id: 1,
      name: 'productX',
    };

    sinon.stub(connection, 'execute').resolves([{ affectedRows: 1 }]);

    const result = await productModel.updateProduct(product);

    expect(result).to.be.eq(1);
  });

  it('Não atualiza produto caso não exista', async function () {
    const product = {
      id: 99,
      name: 'productX',
    };

    sinon.stub(connection, 'execute').resolves([{ affectedRows: 0 }]);

    const result = await productModel.updateProduct(product);

    expect(result).to.be.eq(0);
  });

  it('Busca produto por query', async function () {
    const q = 'martelo';

    sinon.stub(connection, 'execute').resolves([[mockProductsById], []]);

    const result = await productModel.searchProductByQuery(q);

    expect(result).to.be.deep.equal([mockProductsById]);
    expect(connection.execute.firstCall.args[1][0]).to.equal('%martelo%');
  });

  it('Retorna [] para busca sem sucesso do produto por query', async function () {
    const q = 'asdasd';

    sinon.stub(connection, 'execute').resolves([[], []]);

    const result = await productModel.searchProductByQuery(q);

    expect(result).to.be.deep.equal([]);
  });
});