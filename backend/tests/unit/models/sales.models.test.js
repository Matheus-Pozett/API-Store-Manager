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
});