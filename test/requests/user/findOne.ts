export const findOne = {
  operationName: 'fetch',
  variables: {},
  query: `query fetch {
  fetchUser: user(id: 1) {
    id
    name
    age
    email
    orders {
      id
      name
      price
    }
  }  
}`,
};
