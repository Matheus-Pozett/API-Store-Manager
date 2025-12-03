/* eslint-disable no-unused-expressions */
const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const productMiddleware = require('../../../src/middlewares/product.middleware');
 
const { expect } = chai;

chai.use(sinonChai);

describe('PRODUCT MIDDLEWARE', function () {
  afterEach(function () {
    sinon.restore();
  });

  it('Verifica se retorna erro em caso do body sem a propriedade name', function () {
    const req = {
      body: {},
    };

    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    const next = sinon.stub().returns();

    productMiddleware.validateNewProduct(req, res, next);

    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).to.have.been.calledWith({ message: '"name" is required' });
    expect(next).to.not.have.been.called;
  });
});