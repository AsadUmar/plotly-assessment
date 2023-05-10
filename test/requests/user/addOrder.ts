export const addOrder = {
  operationName: 'add',
  variables: {},
  query: `mutation add {
    addOrder: addOrder(addOrderInput: {userId: 1, productId: 1}) {
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
`,
};
