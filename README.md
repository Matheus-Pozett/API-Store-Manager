# Store Manager API

![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![MySQL](https://img.shields.io/badge/mysql-%2300f.svg?style=for-the-badge&logo=mysql&logoColor=white)
![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)
![Mocha](https://img.shields.io/badge/-mocha-%238D6748?style=for-the-badge&logo=mocha&logoColor=white)

## Sobre o Projeto

O **Store Manager** é uma API RESTful desenvolvida para o gerenciamento de vendas e produtos de uma loja. O sistema permite criar, visualizar, deletar e atualizar produtos e vendas.

O projeto foi construído utilizando a arquitetura **MSC (Model-Service-Controller)**, garantindo a segregação de responsabilidades, testabilidade e manutenibilidade do código.

---

## Tecnologias Utilizadas

* **Node.js** & **Express**: Para construção da API.
* **MySQL**: Banco de dados relacional.
* **Docker**: Para containerização da aplicação e do banco de dados.
* **Mocha, Chai & Sinon**: Para testes unitários.
* **Joi**: Para validação de dados (Middlewares).

---

## Arquitetura e Design

O projeto segue a arquitetura em camadas (Layered Architecture):

1.  **Model**: Acesso direto ao banco de dados (MySQL).
2.  **Service**: Regras de negócio e validações lógicas.
3.  **Controller**: Interface com a requisição HTTP (Request/Response).

### Diagrama ER (Banco de Dados)
A estrutura do banco consiste nas tabelas `products`, `sales` e a tabela de associação `sales_products`.

* **Products**: Armazena os produtos (`id`, `name`).
* **Sales**: Armazena a data da venda (`id`, `date`).
* **Sales_Products**: Relacionamento N:N, armazenando a quantidade vendida de cada produto em cada venda.

## Como Rodar o Projeto

### Pré-requisitos
* Docker e Docker Compose instalados.

### Passo a Passo

1.  **Clone o repositório:**
    ```bash
    git clone git@github.com:Matheus-Pozett/API-Store-Manager.git
    cd API-Store-Manager
    ```

2.  **Instale as dependências:**
    ```bash
    npm install
    ```

3.  **Suba os containers (Aplicação + Banco):**
    ```bash
    docker-compose up -d
    ```

4.  **Acesse a API:**
    O servidor estará rodando em `http://localhost:3001`.

---

## Testes

O projeto possui ampla cobertura de testes unitários para garantir a confiabilidade das camadas Model, Service e Controller.

Para rodar os testes:

```bash
npm test
```

## Endpoints

### 🛒 Products
| Método | Funcionalidade                            | URL                            |
| ------ | ----------------------------------------- | ------------------------------ |
| `GET`  | Retorna uma lista de produtos cadastrados | http://localhost:3001/products |

<details>
  <summary>A resposta da requisição é a seguinte, com status 200:</summary>

```json
[
  {
    "id": 1,
    "name": "Martelo de Thor"
  },
  {
    "id": 2,
    "name": "Traje de encolhimento"
   },
  {
    "id": 3,
    "name": "Escudo do Capitão América"
  }
]
```

</details>
<br>
<br>

| Método | Funcionalidade                                             | URL                                |
| ------ | ---------------------------------------------------------- | ---------------------------------- |
| `GET`  | Retorna um produto pelo id (substitua `:id` por um número) | http://localhost:3001/products/:id |

<details>
  <summary>A resposta da requisição é a seguinte, com status 200:</summary>

```json
{
  "id": 1,
  "name": "Martelo de Thor"
}
```

</details>

<details>
  <summary>A requisição irá falhar nos seguintes casos:</summary>
  - A rota retorna o código <code>404</code>, com a mensagem <code>Product not found</code> caso tente acessar um id não existente no banco.<br>
</details>
<br>
<br>

| Método | Funcionalidade                           | URL                            |
| ------ | ---------------------------------------- | ------------------------------ |
| `POST` | Insere um novo produto no banco de dados | http://localhost:3001/products |

<details>
  <summary>A estrutura do <code>body</code> da requisição deverá seguir o padrão abaixo:</summary>

```json
{
  "name": "ProdutoX"
}
```

</details>

<details>
  <summary>A resposta da requisição é a seguinte, com status 201:</summary>

```json
{
  "id": 4,
  "name": "ProdutoX"
}
```

</details>

<details>
  <summary>A requisição irá falhar nos seguintes casos:</summary>
  - A rota retorna o código <code>400</code>, com a mensagem <code>"name" is required</code> caso o campo name não seja informado no body da requisição;<br>
  - A rota retorna o código <code>422</code>, com a mensagem <code>"name" length must be at least 5 characters long</code> caso o campo name tenha menos de 5 caracteres no body da requisição.<br>
</details>
<br>
<br>

| Método | Funcionalidade                                                                    | URL                                |
| ------ | --------------------------------------------------------------------------------- | ---------------------------------- |
| `PUT`  | Atualiza um produto no banco de dados pelo seu id (substitua `:id` por um número) | http://localhost:3001/products/:id |

<details>
  <summary>A estrutura do <code>body</code> da requisição deverá seguir o padrão abaixo:</summary>

```json
{
  "name": "Martelo do Batman"
}
```

</details>

<details>
  <summary>A resposta da requisição é a seguinte, com status 200:</summary>

```json
{
  "id": 1,
  "name": "Martelo do Batman"
}
```

</details>

<details>
  <summary>A requisição irá falhar nos seguintes casos:</summary>
  - A rota retorna o código <code>400</code>, com a mensagem <code>"name" is required</code> caso o campo name não seja informado no body da requisição;<br>
  - A rota retorna o código <code>422</code>, com a mensagem <code>"name" length must be at least 5 characters long</code> caso o campo name tenha menos de 5 caracteres no body da requisição;<br>
  - A rota retorna o código <code>404</code>, com a mensagem <code>Product not found</code> caso tente acessar um id não existente no banco.<br>
</details>
<br>
<br>

| Método   | Funcionalidade                                                      | URL                                |
| -------- | ------------------------------------------------------------------- | ---------------------------------- |
| `DELETE` | Remove um produto do banco de dados (substitua `:id` por um número) | http://localhost:3001/products/:id |

A rota retorna o status 204, <code>sem resposta</code>.

<details>
  <summary>A requisição irá falhar nos seguintes casos:</summary>
  - A rota retorna o código <code>404</code>, com a mensagem <code>Product not found</code> caso tente acessar um id não existente no banco.<br>
</details>
<br>
<br>

| Método | Funcionalidade                                                                                    | URL                                                 |
| ------ | ------------------------------------------------------------------------------------------------- | --------------------------------------------------- |
| `GET`  | Retorna uma lista de produtos com base em um filtro (substitua `searchTerm` pelo nome do produto) | http://localhost:3001/products/search?q=searchTerm |

<details>
  <summary>A resposta da requisição é a seguinte, com status 200:</summary>

```json
// GET /products/search?q=Martelo

[
  {
    "id": 1,
    "name": "Martelo de Thor",
  }
]
```

</details>
<br>
<br>

### 💸 Sales
| Método | Funcionalidade                          | URL                         |
| ------ | --------------------------------------- | --------------------------- |
| `GET`  | Retorna uma lista de vendas cadastradas | http://localhost:3001/sales |

<details>
  <summary>A resposta da requisição é a seguinte, com status 200:</summary>
  
```json
[
  {
    "saleId": 1,
    "productId": 1,
    "quantity": 5,
    "date": "2022-10-25T21:03:44.000Z"
  },
  {
    "saleId": 1,
    "productId": 2,
    "quantity": 10,
    "date": "2022-10-25T21:03:44.000Z"
  },
  {
    "saleId": 2,
    "productId": 3,
    "quantity": 15,
    "date": "2022-10-25T21:03:44.000Z"
  }
]
```

</details>
<br>
<br>

| Método | Funcionalidade                                           | URL                             |
| ------ | -------------------------------------------------------- | ------------------------------- |
| `GET`  | Retorna uma venda pelo id (substitua `id` por um número) | http://localhost:3001/sales/:id |

<details>
  <summary>A resposta da requisição é a seguinte, com status 200:</summary>
  
```json
[
  {
    "productId": 1,
    "quantity": 5,
    "date": "2022-10-25T21:03:44.000Z"
  },
  {
    "productId": 2,
    "quantity": 10,
    "date": "2022-10-25T21:03:44.000Z"
  }
]
```

</details>
<br>
<br>

| Método | Funcionalidade                       | URL                         |
| ------ | ------------------------------------ | --------------------------- |
| `POST` | Adiciona uma venda no banco de dados | http://localhost:3001/sales |

<details>
  <summary>A estrutura do <code>body</code> da requisição deverá seguir o padrão abaixo:</summary>

```json
[
  {
    "productId": 1,
    "quantity": 1
  },
  {
    "productId": 2,
    "quantity": 5
  }
]
```

</details>

<details>
  <summary>A resposta da requisição é a seguinte, com status 201:</summary>
  
```json
{
  "id": 3,
  "itemsSold": [
    {
      "productId": 1,
      "quantity": 1
    },
    {
      "productId": 2,
      "quantity": 5
    }
  ]
}
```

</details>

<details>
  <summary>A requisição irá falhar nos seguintes casos:</summary>
  - A rota retorna o código <code>400</code>, com a mensagem <code>"productId" is required</code> caso algum dos itens na lista de vendas não possua o campo productId no body da requisição;<br>
  - A rota retorna o código <code>400</code>, com a mensagem <code>"quantity" is required</code> caso algum dos itens na lista de vendas não possua o campo quantity no body da requisição;<br>
  - A rota retorna o código <code>422</code>, com a mensagem <code>"quantity" must be greater than or equal to 1</code> caso algum dos itens na lista de vendas possua o campo quantity com valor abaixo de 1 no body da requisição;<br>
  - A rota retorna o código <code>404</code>, com a mensagem <code>Product not found</code> caso tente acessar um id não existente no banco.<br>
</details>
<br>
<br>

| Método | Funcionalidade                                                      | URL                             |
| ------ | ------------------------------------------------------------------- | ------------------------------- |
| `PUT`  | Atualiza uma venda no banco de dados (substitua `id` por um número) | http://localhost:3001/sales/:saleId/products/:productId/quantity |

<details>
  <summary>A estrutura do <code>body</code> da requisição deverá seguir o padrão abaixo:</summary>

```json
  {
    "quantity": 10
  }
```

</details>

<details>
  <summary>A resposta da requisição é a seguinte, com status 200:</summary>
  
```json
{
  "saleId": 1,
  "productId": 2,
  "quantity": 20,
  "date": "2023-05-06T03:14:28.000Z"
}
```

</details>

<details>
  <summary>A requisição irá falhar nos seguintes casos:</summary>
  - A rota retorna o código <code>400</code>, com a mensagem <code>"productId" is required</code> caso algum dos itens na lista de vendas não possua o campo productId no body da requisição;<br>
  - A rota retorna o código <code>400</code>, com a mensagem <code>"quantity" is required</code> caso algum dos itens na lista de vendas não possua o campo quantity no body da requisição;<br>
  - A rota retorna o código <code>400</code>, com a mensagem <code>"quantity" must be greater than or equal to 1</code> caso algum dos itens na lista de vendas possua o campo quantity com valor abaixo de 1 no body da requisição;<br>
  - A rota retorna o código <code>404</code>, com a mensagem <code>Sale not found</code> caso tente acessar um id não existente no banco.<br>
</details>
<br>
<br>

| Método   | Funcionalidade                                                     | URL                             |
| -------- | ------------------------------------------------------------------ | ------------------------------- |
| `DELETE` | Remove uma venda do banco de dados (substitua `:id` por um número) | http://localhost:3001/sales/:id |

A rota retorna o status 204, <code>sem resposta</code>.

<details>
  <summary>A requisição irá falhar nos seguintes casos:</summary>
  - A rota retorna o código <code>404</code>, com a mensagem <code>Sale not found</code> caso tente acessar um id não existente no banco.<br>
</details>

---

Desenvolvido 💚 por [Matheus Pozett](https://www.linkedin.com/in/matheus-pozett/)