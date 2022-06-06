const { register, login, getUserById } = require("../services/user.service");

module.exports = {
  Query: {
    todos: (parent, args, context, info) => {
      console.log(context);
      const todos = [];
      cache.forEach((type, id) => todos.push({ type, id }));
      return todos;
    },
    todo: (parent, args, context, info) => {
      return { id, type: cache.get(id) };
    },
    user: (parent, args, context, info) => {
      if (!context.userId) {
        throw new Error("Unauthorized");
      }

      const user = getUserById(context.userId);

      return user;
    },
  },
  Mutation: {
    login: async (parent, args, context, info) => {
      const resultLogin = await login(args);

      if (resultLogin.success) {
        return { token: resultLogin.data.token };
      } else {
        throw new Error(resultLogin.message);
      }
    },
    register: async (parent, args, context, info) => {
      const resultRegister = await register(args);

      if (resultRegister.success) {
        return { token: resultRegister.data.token };
      } else {
        throw new Error(resultRegister.message);
      }
    },
    addTodo: (parent, args, context, info) => {
      const id = generate();
      const todo = { type, id };
      console.log(`Adding todo ${id}`);
      cache.set(id, type);
      return todo;
    },
    updateTodo: (parent, args, context, info) => {
      console.log(`Updating todo ${id}`);
      const todo = { type, id };
      cache.set(id, type);
      return todo;
    },
    removeTodo: (parent, args, context, info) => {
      console.log(`Removing todo ${id}`);
      cache.del(id);
      return { id };
    },
  },
};
