import { GraphQLError } from "graphql";
import TodoModel from "../../models/todoModel.js";

export const todoQuery = {
  async todos(_, __, context) {
    if (!context.user || context.user.role !== "admin") {
      throw new GraphQLError("Not authorized", { extensions: { code: "AUTH", status: 403 } });
    }
    return await TodoModel.find();
  },
  async todosByUser(_, { userId }, context) {
    if (!context.user || (context.user.role !== "admin" && context.user.id !== userId)) {
      throw new GraphQLError("Not authorized", { extensions: { code: "AUTH", status: 403 } });
    }
    return await TodoModel.find({ userId });
  },
  async todo(_, { id }, context) {
    if (!context.user) {
      throw new GraphQLError("Not authenticated", { extensions: { code: "AUTH", status: 401 } });
    }
    const todo = await TodoModel.findById(id);
    if (!todo) throw new GraphQLError("Todo not found", { extensions: { code: "NOT_FOUND", status: 404 } });
    if (context.user.role !== "admin" && String(todo.userId) !== context.user.id) {
      throw new GraphQLError("Not authorized", { extensions: { code: "AUTH", status: 403 } });
    }
    return todo;
  },
};
