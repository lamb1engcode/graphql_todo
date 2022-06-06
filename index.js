const { ApolloServer, gql } = require("apollo-server");
const LRU = require("lru-cache");
const { generate } = require("shortid");

const typeDefs = require("./schema/schema");
// Provide resolver functions for your schema fields
const resolvers = require("./config/resolvers");
const database = require("./config/database");
const { PORT } = require("./config/env");
const { verify } = require("./services/jwt.service");

function getUser(userId) {
  const users = [];
  cacheUser.forEach((user, id) =>
    users.push({ id, username: user.username, password: user.password })
  );

  return users.find((user) => user.id === userId);
}

// Connect Database
database.connect().then(() => {
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

      console.log(token)

      if (token == "") {
        return;
      }

      // Decode token
      const { userId } = verify(token);

      if (userId) {
        const user = getUser(userId);

        // Add the user to the context
        return { token };
      }

      return;
    },
  });

  server.listen({ port: PORT }).then(() => {
    console.log(`🚀 Server ready at http://localhost:${PORT}`);
  });
});
