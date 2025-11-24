const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const { mockServiceResponseSuccess } = require('./mocks/index');
const { productService } = require('../../../src/services/index');
const { productController } = require('../../../src/controllers/index');
  
const { expect } = chai;

chai.use(sinonChai);

describe('TESTS PRODUCT CONTROLER', function () {
  afterEach(function () {
    sinon.restore();
  });
  it('Deve retornar o status 200 e a lista de usuários', async function () {
    const req = {};
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub().returns(),
    };

    sinon.stub(productService, 'getProducts').resolves(mockServiceResponseSuccess);

    await productController.getProducts(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(mockServiceResponseSuccess.data);
  });
});