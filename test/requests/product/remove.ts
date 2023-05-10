export const remove = {
  operationName: 'remove',
  variables: {},
  query: `mutation remove {
  removeProduct: removeProduct(id: 1) {
    id
    name
    price
  }
}`,
};
