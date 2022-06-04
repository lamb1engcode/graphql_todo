const { ApolloServer, gql } = require("apollo-server");
const LRU = require("lru-cache");
const { generate } = require("shortid");

// Construct a schema, using GraphQL schema language
const typeDefs = `
  type Query {
    todos: [Todo]
		todo(id: String!): Todo
    user(id: String!): User
  }

	type Todo {
		id: String!
		type: String!
	}

  type User {
    id: String!
    username: String!
    password: String!
  }

	type Mutation {
    login(username: String!, password: String!): User
    register(username: String!, password: String!): User
		addTodo(type: String!): Todo
		updateTodo(id: String!, type: String!): Todo
    removeTodo(id: String!): Todo
	}
`;

const cache = LRU({ max: 50, maxAge: 1000 * 60 * 60000 });
const cacheUser = LRU({ max: 50, maxAge: 1000 * 60 * 60000 });

// Provide resolver functions for your schema fields
const resolvers = {
  Query: {
    todos: () => {
      const todos = [];
      cache.forEach((type, id) => todos.push({ type, id }));
      return todos;
    },
    todo: (_, { id }) => {
      return { id, type: cache.get(id) };
    },
    user: (_, { id }) => {
      return { id, username: cacheUser.get(id) };
    },
  },
  Mutation: {
    login: (_, { username, password }) => {
      return { id, username, password };
    },
    register: (_, { username, password }) => {
      const id = generate();
      cache.set(id, username);
      return { id, username, password };
    },
    addTodo: (_, { type }) => {
      const id = generate();
      const todo = { type, id };
      console.log(`Adding todo ${id}`);
      cache.set(id, type);
      return todo;
    },
    updateTodo: (_, { type, id }) => {
      console.log(`Updating todo ${id}`);
      const todo = { type, id };
      cache.set(id, type);
      return todo;
    },
    removeTodo(_, { id }) {
      console.log(`Removing todo ${id}`);
      cache.del(id);
      return { id };
    },
  },
};

function getUser(userId) {
  console.log(userId)
  const users = [];
  cacheUser.forEach((username, password, id) =>
    users.push({ username, password, id })
  );

  return users.find(user => user.id === userId);
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  csrfPrevention: true,
  context: ({ req }) => {
    // Note: This example uses the `req` argument to access headers,
    // but the arguments received by `context` vary by integration.
    // This means they vary for Express, Koa, Lambda, etc.
    //
    // To find out the correct arguments for a specific integration,
    // see https://www.apollographql.com/docs/apollo-server/api/apollo-server/#middleware-specific-context-fields

    // Get the user token from the headers.
    const token = req.headers.authorization || "";

    // Try to retrieve a user with the token
    const user = getUser(token);

    // Add the user to the context
    return { user };
  },
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
