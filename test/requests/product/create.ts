export const create = {
  operationName: 'seed',
  variables: {},
  query: `mutation seed {
  createProduct: createProduct(
    createProductInput: { name: "Apple", price: 2.99 }
  ) {
    id
    name
    price
  }
}
  `,
};
