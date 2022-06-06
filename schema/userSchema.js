const userModel = `
    type User {
        id: String!
        username: String!
        password: String!
    }

    type Token {
        token: String!
    }
`;

const userQuery = `
    user: User
`;

const userMutation = `
    login(username: String!, password: String!): Token!
    register(username: String!, password: String!): Token!
`;

module.exports = {
  userModel,
  userQuery,
  userMutation,
};
