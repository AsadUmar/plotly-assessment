export const removeOrder = {
  operationName: 'remove',
  variables: {},
  query: `mutation remove {
  removeOrder: removeOrder(removeOrderInput: {userId: 1, productId: 1}) {
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
}`,
};
