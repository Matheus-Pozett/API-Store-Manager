const express = require('express');
const { getProduct } = require('./models/product.model');
// const productRouter = require('./routes/products.router');

const app = express();
app.use(express.json());

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.json({ status: 'Store Manager UP!' });
});

app.get('/product', async (req, res) => {
  const pro = await getProduct();
  console.log(pro);
  return res.status(200).json(pro);
});

module.exports = app;
