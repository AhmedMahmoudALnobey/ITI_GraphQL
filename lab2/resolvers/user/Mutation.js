import UserModel from "../../models/userModel.js";
import bcrypt from "bcryptjs";
import { GraphQLError } from "graphql";
import jwt from "jsonwebtoken";

export const userMutation = {
  async createUser(_, args, context) {
    if (!context.user || context.user.role !== "admin") {
      throw new GraphQLError("Not authorized", { extensions: { code: "AUTH", status: 403 } });
    }
    const user = new UserModel(args.user);
    await user.save();
    return user;
  },

  async register(_, args) {
    const user = new UserModel(args.user);
    await user.save();
    return user;
  },

  async updateUser(_, { id, user }, context) {
    if (!context.user || (context.user.role !== "admin" && context.user.id !== id)) {
      throw new GraphQLError("Not authorized", { extensions: { code: "AUTH", status: 403 } });
    }
    if (user.password) {
      user.password = await bcrypt.hash(user.password, 15);
    }
    return await UserModel.findByIdAndUpdate(id, user, { new: true });
  },

  async deleteUser(_, { id }, context) {
    if (!context.user || (context.user.role !== "admin" && context.user.id !== id)) {
      throw new GraphQLError("Not authorized", { extensions: { code: "AUTH", status: 403 } });
    }
    return await UserModel.findByIdAndDelete(id);
  },

  async login(_, args) {
    const { email, password } = args;
    const user = await UserModel.findOne({ email });
    const isMatch = await bcrypt.compare(password, user?.password);
    if (!user || !isMatch) {
      throw new GraphQLError("Invalid Email or Password", {
        extensions: { code: "AUTH", status: 401 },
      });
    }
    const token = jwt.sign(
      { id: user._id, name: user.name, email: user.email, role: user.role },
      process.env.SECRET,
      { expiresIn: "7d" }
    );
    return {
      message: "Login Successfully",
      token,
      user,
    };
  },
};
