const { userModel, userQuery, userMutation } = require("./userSchema");
const { todoModel, todoQuery, todoMutation } = require("./todoSchema");

module.exports = `
  ${userModel}
  ${todoModel}

  type Query {
    ${userQuery}
    ${todoQuery} 
  }

  type Mutation {
    ${userMutation}
    ${todoMutation}    
  }
`;
