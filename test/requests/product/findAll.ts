export const findAll = {
  operationName: 'fetch',
  variables: {},
  query: `query fetch {
  fetchProducts: products {
    id
    name
    price
  }  
}`,
};
