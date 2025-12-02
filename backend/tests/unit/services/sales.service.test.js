const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const { mockAllSales, mockSalesById } = require('../models/mocks/mocksSales');
const { salesModel } = require('../../../src/models');
const { salesService } = require('../../../src/services');

const { expect } = chai;

chai.use(sinonChai);

describe.only('SALES SERVICE', function () {
  afterEach(function () {
    sinon.restore();
  });

  it('Retorna a lista de vendas e status SUCCESSFUL', async function () {
    sinon.stub(salesModel, 'getSales').resolves(mockAllSales);

    const result = await salesService.getSales();

    expect(result.status).to.be.eq('SUCCESSFUL');
    expect(result.data).to.be.deep.equal(mockAllSales);
  });

  it('Retorna a lista de vendas pelo ID e status SUCCESSFUL', async function () {
    const id = 1;
    sinon.stub(salesModel, 'getSalesById').resolves(mockSalesById);

    const result = await salesService.getSalesById(id);

    expect(result.status).to.be.eq('SUCCESSFUL');
    expect(result.data).to.be.deep.equal(mockSalesById);
    expect(salesModel.getSalesById).to.have.been.calledWith(1);
  });
});