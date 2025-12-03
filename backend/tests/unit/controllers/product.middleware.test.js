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

  it('Verifica se retorna erro em caso do body com name menor que 5 caracteres', function () {
    const req = {
      body: { name: 'test' },
    };

    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    const next = sinon.stub().returns();

    productMiddleware.validateNewProduct(req, res, next);

    expect(res.status).to.have.been.calledWith(422);
    expect(res.json).to.have.been.calledWith({ message: '"name" length must be at least 5 characters long' });
    expect(next).to.not.have.been.called;
  });

  it('Em caso de campos válidos o next é chamado', function () {
    const req = {
      body: { name: 'teste' },
    };

    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    const next = sinon.stub().returns();

    productMiddleware.validateNewProduct(req, res, next);

    expect(next).to.have.been.calledWith();
  });
});