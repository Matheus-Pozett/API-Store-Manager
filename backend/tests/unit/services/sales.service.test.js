const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const { mockAllSales, mockSalesById } = require('../models/mocks/mocksSales');
const { salesModel, productModel } = require('../../../src/models');
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

  it('Retorna status CREATED e a lista de venda(s) cadastradas', async function () {
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

  it('Retorna status 404 e mensagem de produto não encontrado caso não exista no banco de dados', async function () {
    const sales = [
      {
        productId: 999,
        quantity: 1,
      },
    ];

    sinon.stub(productModel, 'getProductById').resolves(undefined);

    const result = await salesService.createSales(sales);
    
    expect(result.status).to.be.eq('NOT_FOUND');
    expect(result.data).to.be.deep.equal({ message: 'Product not found' });
  });

  it('Retorna status 204 para caso de uma venda deletada com sucesso', async function () {
    const id = 1;

    sinon.stub(salesModel, 'deleteSales').resolves(1);

    const result = await salesService.deleteSale(id);

    expect(result.status).to.be.eq('NO_CONTENT');
    expect(result.data).to.be.eq(undefined);
  });

  it('Retorna status 404 para caso venda não seja encontrada ao tentar deletar', async function () {
    const id = 1;

    sinon.stub(salesModel, 'deleteSales').resolves(0);

    const result = await salesService.deleteSale(id);

    expect(result.status).to.be.eq('NOT_FOUND');
    expect(result.data).to.be.deep.equal({ message: 'Sale not found' });
  });

  it('Retorna erro "Sale not found" caso a venda não exista', async function () {
    const saleId = 999;
    const productId = 1;
    const quantity = 10;

    sinon.stub(salesModel, 'getSalesById').resolves([]); 

    const result = await salesService.updateSaleProductQuantity(saleId, productId, quantity);

    expect(result.status).to.be.equal('NOT_FOUND');
    expect(result.data).to.be.deep.equal({ message: 'Sale not found' });
  });

  it('Retorna erro "Product not found in sale" caso o produto não exista na venda', async function () {
    const saleId = 1;
    const productId = 999;
    const quantity = 10;

    sinon.stub(salesModel, 'getSalesById').resolves([{ date: '2025-01-01T00:00:00.000Z', id: 1 }]);
    sinon.stub(salesModel, 'getSaleProduct').resolves([]);

    const result = await salesService.updateSaleProductQuantity(saleId, productId, quantity);

    expect(result.status).to.be.equal('NOT_FOUND');
    expect(result.data).to.be.deep.equal({ message: 'Product not found in sale' });
  });

  it('Retorna sucesso e o objeto atualizado corretamente', async function () {
    const saleId = 1;
    const productId = 2;
    const quantity = 50;
    const mockDate = '2025-01-01T00:00:00.000Z';

    sinon.stub(salesModel, 'getSalesById').resolves([{ date: mockDate, id: 1 }]);
    
    sinon.stub(salesModel, 'getSaleProduct').resolves([{ saleId: 1, productId: 2 }]);
    
    sinon.stub(salesModel, 'updateSaleProductQuantity').resolves(1);
    const result = await salesService.updateSaleProductQuantity(saleId, productId, quantity);

    expect(result.status).to.be.equal('SUCCESSFUL');
    expect(result.data).to.be.deep.equal({
      saleId: 1,
      productId: 2,
      quantity: 50,
      date: mockDate,
    });
  });
});