import UserModel from "../../models/userModel.js";
import { GraphQLError } from "graphql";

export const userQuery = {
  async users(_, __, context) {
    if (!context.user || context.user.role !== "admin") {
      throw new GraphQLError("Not authorized", { extensions: { code: "AUTH", status: 403 } });
    }
    return await UserModel.find();
  },
  async user(_, args, context) {
    if (!context.user || (context.user.role !== "admin" && context.user.id !== args.id)) {
      throw new GraphQLError("Not authorized", { extensions: { code: "AUTH", status: 403 } });
    }
    return await UserModel.findById(args.id);
  },
};
