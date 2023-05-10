export const create = {
  operationName: 'createUser',
  variables: {},
  query: `mutation createUser {
    createUser: createUser( createUserInput: {
    name: "Asad Umar",
    email: "asad.umar@gmail.com",
    age: 27
    }) {
    id
    name
    age
    email 
    orders {
      id
    }
  }
}
  `,
};
