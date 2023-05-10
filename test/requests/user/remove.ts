export const remove = {
  operationName: 'remove',
  variables: {},
  query: `mutation remove {
  removeUser: removeUser(id: 1) {
    id
    name
    age
    email
  }
}`,
};
