export const findAll = {
  operationName: 'fetch',
  variables: {},
  query: `query fetch {
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
}`,
};
