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

  it('É possivel listar todas as vendas e retornar status 200', async function () {
    // Arrange
    sinon.stub(connection, 'execute').resolves([mockAllSales, []]);

    // Act

    const result = await salesModel.getSales();

    // Assert

    expect(result).to.be.deep.equal(mockAllSales);
  });
});