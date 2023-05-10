export const update = {
  operationName: 'update',
  variables: {},
  query: `mutation update {
  updateProduct: updateProduct(updateProductInput: {id: 1, price: 1.5,}) {
    id
    name
    price
  }
}`,
};
