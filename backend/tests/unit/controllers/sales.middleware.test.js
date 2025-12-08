/* eslint-disable no-unused-expressions */
const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const salesMiddleware = require('../../../src/middlewares/sales.middleware');
 
const { expect } = chai;

chai.use(sinonChai);

describe('SALES MIDDLEWARE', function () {
  afterEach(function () {
    sinon.restore();
  });

  it('Verifica se retorna erro em caso do body sem a propriedade productId', function () {
    const req = {
      body: [
        {
          quantity: 1,
        },
      ],
    };

    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    const next = sinon.stub().returns();

    salesMiddleware.validateNewSales(req, res, next);

    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).to.have.been.calledWith({ message: '"productId" is required' });
    expect(next).to.not.have.been.called;
  });

  it('Verifica se retorna erro em caso do body sem a propriedade quantity', function () {
    const req = {
      body: [{
        productId: 3,
      }],
    };

    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    const next = sinon.stub().returns();

    salesMiddleware.validateNewSales(req, res, next);

    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).to.have.been.calledWith({ message: '"quantity" is required' });
    expect(next).to.not.have.been.called;
  });

  it('Testa se retorna erro em caso de quantity com valor <= 0', function () {
    const req = {
      body: [{
        productId: 3,
        quantity: 0,
      }],
    };

    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    const next = sinon.stub().returns();

    salesMiddleware.validateNewSales(req, res, next);

    expect(res.status).to.have.been.calledWith(422);
    expect(res.json).to.have.been.calledWith({ message: '"quantity" must be greater than or equal to 1' });
    expect(next).to.not.have.been.called;
  });

  it('Testa se next é chamado em caso de body com campos validos', function () {
    const req = {
      body: [{
        productId: 3,
        quantity: 1,
      }],
    };

    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    const next = sinon.stub().returns();

    salesMiddleware.validateNewSales(req, res, next);
    
    expect(next).to.have.been.called;
  });
});