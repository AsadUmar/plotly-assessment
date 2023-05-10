export const update = {
  operationName: 'update',
  variables: {},
  query: `mutation update {
  updateUser: updateUser(updateUserInput: {id: 1, email: "asad.umar@yahoo.com",}) {
    id
    name
    age
    email
  }
}`,
};
