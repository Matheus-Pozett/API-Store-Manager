const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const connection = require('../../../src/models/connection');
const { mockAllSales, mockSalesById } = require('./mocks/mocksSales');
const { salesModel } = require('../../../src/models');

const { expect } = chai;

chai.use(sinonChai);

describe('SALES MODELS', function () {
  afterEach(function () {
    sinon.restore();
  });

  it('É possivel listar todas as vendas', async function () {
    // Arrange
    sinon.stub(connection, 'execute').resolves([mockAllSales, []]);

    // Act

    const result = await salesModel.getSales();

    // Assert

    expect(result).to.be.deep.equal(mockAllSales);
  });

  it('Retorna uma lista de vendas pelo ID', async function () {
    const id = 1;
    sinon.stub(connection, 'execute').resolves([mockSalesById, []]);
    const result = await salesModel.getSalesById(id);
    expect(result).to.be.deep.equal(mockSalesById);
  });

  it('Retorna um array vazio ao não encontrar vendas pelo ID', async function () {
    const id = 999;
    sinon.stub(connection, 'execute').resolves([[], []]);
    const result = await salesModel.getSalesById(id);
    expect(result).to.be.deep.equal([]);
  });

  it('Cadastra venda no banco', async function () {
    const id = 1;
    sinon.stub(connection, 'execute').resolves([{ insertId: 1 }, []]);
    const result = await salesModel.createSales();
    expect(result).to.be.deep.equal(id);
  });

  it('Deleta uma venda do banco de dados', async function () {
    const id = 1;
    sinon.stub(connection, 'execute').resolves([{ affectedRows: 1 }, []]);

    const result = await salesModel.deleteSales(id);

    expect(result).to.be.eq(1);
  });

  it('Não deleta uma venda do banco de dados', async function () {
    const id = 1;
    sinon.stub(connection, 'execute').resolves([{ affectedRows: 0 }, []]);

    const result = await salesModel.deleteSales(id);

    expect(result).to.be.eq(0);
  });

  it('Retorna o produto da venda caso ele exista', async function () {
    const saleId = 1;
    const productId = 2;
    const mockResult = [{ saleId: 1, productId: 2, quantity: 5 }];

    sinon.stub(connection, 'execute').resolves([mockResult, []]);

    const result = await salesModel.getSaleProduct(saleId, productId);

    expect(result).to.be.deep.equal(mockResult);
  });

  it('Retorna array vazio caso o produto não exista na venda', async function () {
    const saleId = 1;
    const productId = 999;

    sinon.stub(connection, 'execute').resolves([[], []]);

    const result = await salesModel.getSaleProduct(saleId, productId);

    expect(result).to.be.deep.equal([]);
  });

  it('Atualiza a quantidade com sucesso e retorna affectedRows = 1', async function () {
    const saleId = 1;
    const productId = 2;
    const quantity = 20;

    sinon.stub(connection, 'execute').resolves([{ affectedRows: 1 }, []]);

    const result = await salesModel.updateSaleProductQuantity(saleId, productId, quantity);

    expect(result).to.be.equal(1);

    expect(connection.execute.firstCall.args[1]).to.deep.equal([quantity, saleId, productId]);
  });
});