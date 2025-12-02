const express = require('express');
const { productRouter, salesRouter } = require('./routes');

const app = express();
app.use(express.json()); // transforma o corpo da requisição em um objeto js

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.json({ status: 'Store Manager UP!' });
});

app.use('/products', productRouter);
app.use('/sales', salesRouter);

module.exports = app;
