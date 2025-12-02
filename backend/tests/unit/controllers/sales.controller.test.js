const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const { mockServiceResponseSuccess, mockServiceResponseSuccessById, mockServiceResponseNotFound } = require('./mocks/mocksSalesController');
const { salesService } = require('../../../src/services/index');
const { salesController } = require('../../../src/controllers/index');
  
const { expect } = chai;

chai.use(sinonChai);

describe.only('SALES CONTROLLER', function () {
  afterEach(function () {
    sinon.restore();
  });

  it('Retorna statusCode 200 e a lista de vendas', async function () {
    const req = {};
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    sinon.stub(salesService, 'getSales').resolves(mockServiceResponseSuccess);

    await salesController.getSales(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(mockServiceResponseSuccess.data);
  });
});