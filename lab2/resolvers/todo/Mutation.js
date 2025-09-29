import TodoModel from "../../models/todoModel.js";
import { GraphQLError } from "graphql";

export const todoMutation = {
  async createTodo(_, args, context) {
    if (!context.user) {
      throw new GraphQLError("Not authenticated", { extensions: { code: "AUTH", status: 401 } });
    }
 
    if (context.user.role !== "admin" && args.todo.userId !== context.user.id) {
      throw new GraphQLError("Not authorized", { extensions: { code: "AUTH", status: 403 } });
    }
    const todo = new TodoModel(args.todo);
    await todo.save();
    return todo;
  },

  async updateTodo(_, { id, todo }, context) {
    if (!context.user) {
      throw new GraphQLError("Not authenticated", { extensions: { code: "AUTH", status: 401 } });
    }
    const existing = await TodoModel.findById(id);
    if (!existing) throw new GraphQLError("Todo not found", { extensions: { code: "NOT_FOUND", status: 404 } });
    if (context.user.role !== "admin" && String(existing.userId) !== context.user.id) {
      throw new GraphQLError("Not authorized", { extensions: { code: "AUTH", status: 403 } });
    }
    return await TodoModel.findByIdAndUpdate(id, todo, { new: true });
  },

  async deleteTodo(_, { id }, context) {
    if (!context.user) {
      throw new GraphQLError("Not authenticated", { extensions: { code: "AUTH", status: 401 } });
    }
    const existing = await TodoModel.findById(id);
    if (!existing) throw new GraphQLError("Todo not found", { extensions: { code: "NOT_FOUND", status: 404 } });
    if (context.user.role !== "admin" && String(existing.userId) !== context.user.id) {
      throw new GraphQLError("Not authorized", { extensions: { code: "AUTH", status: 403 } });
    }
    return await TodoModel.findByIdAndDelete(id);
  },
};
