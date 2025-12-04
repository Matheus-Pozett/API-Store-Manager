const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const { mockAllSales, mockSalesById } = require('../models/mocks/mocksSales');
const { salesModel } = require('../../../src/models');
const { salesService } = require('../../../src/services');

const { expect } = chai;

chai.use(sinonChai);

describe('SALES SERVICE', function () {
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

  it('Retorna status NOT_FOUND e uma mensagem de erro', async function () {
    const id = 999;
    sinon.stub(salesModel, 'getSalesById').resolves([]);

    const result = await salesService.getSalesById(id);

    expect(result.status).to.be.eq('NOT_FOUND');
    expect(result.data).to.be.deep.equal({ message: 'Sale not found' });
    expect(salesModel.getSalesById).to.have.been.calledWith(999);
  });

  it.only('Retorna status CREATED e a lista de venda(s) cadastradas', async function () {
    const sales = [
      {
        productId: 1,
        quantity: 1,
      },
      {
        productId: 2,
        quantity: 5,
      },
    ];

    sinon.stub(salesModel, 'createSales').resolves(1);
    sinon.stub(salesModel, 'createSalesProducts').resolves(undefined);

    const result = await salesService.createSales(sales);

    expect(result.status).to.be.eq('CREATED');
    expect(result.data).to.be.deep.equal({
      id: 1,
      itemsSold: [
        {
          productId: 1,
          quantity: 1,
        },
        {
          productId: 2,
          quantity: 5,
        },
      ],
    });
  });
});