export const findOne = {
  operationName: 'fetch',
  variables: {},
  query: `query fetch {
  fetchProduct: product(id: 1) {
    id
    name
    price
  }  
}`,
};
