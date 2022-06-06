const todoModel = `
    type Todo {
        id: String!
        title: String!
        description: String!
        status: Int!
        createdBy: String!
    }
`;

const todoQuery = `
    todos: [Todo]
    todo(id: String!): Todo
`;

const todoMutation = `
    addTodo(title: String!, description: String!): Todo
    updateTodo(id: String!, title: String, description: String): Todo
    checkTodo(id: String!): Todo
    removeTodo(id: String!): Todo
`;

module.exports = {
  todoModel,
  todoQuery,
  todoMutation,
};
