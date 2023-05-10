## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

# How to create Products and Users

```gql
mutation seed {
  createProduct1: createProduct(createProductInput: {name: "Lays", price: 523.545}) {
    id
    name
    price
  }
  
  createProduct2: createProduct(createProductInput: {name: "Pringles", price: 420}) {
    id
    name
    price
  }
  
  createUser1: createUser(createUserInput: {
    name: "Asad",
    email: "asad.umar@gmail.com",
    age: 27
  }) {
    id
    name
    email
    age
  }
  
  linkUserAndProduct: addOrder(addOrderInput: {userId: 1, productId: 1}) {
    id
    name
    email
    age
    orders {
      id
      name
      price
    }
  }
}
```

# How to query Users

```gql
query fetch {
 fetchUsers: users {
    id
    name
    email
    age
    orders {
      id
      name
      price
    }
  } 
}
```

# Further Documentation

Please refer to e2e tests for more examples
