export const typeDefs = `#graphql
 type Query {
  users:[User]
  user(id:ID):User!
  todos:[Todo]
  todo(id:ID!):Todo
  todosByUser(userId:ID!):[Todo]
 }

 type Todo {
  _id:ID 
  title:String 
  status: Status
  userId:ID
 }

 type Mutation {
  createUser(user:RegesterInput):User
  register(user:RegesterInput):User
  updateUser(id:ID!, user:RegesterInput):User
  deleteUser(id:ID!):User
  createTodo(todo:TodoInput):Todo
  updateTodo(id:ID!, todo:TodoInput):Todo
  deleteTodo(id:ID!):Todo
  login(email:String,password:String): LoginResponse
 }

 input TodoInput {
  title:String!
  status:Status
  userId:ID!
 }

 input RegesterInput {
  name:String!
  email:String! 
  password:String!
  role: Role
 }

 type LoginResponse {
  message:String
  token:String 
  user:User
 }

 type User implements IUser {
  _id:ID 
  name:String
  email:String
  password:String 
  role:Role
 }

 enum Role {
  user 
  admin
 }

 enum Status {
  pending 
  inProgress 
  done
 }

 interface IUser {
  name:String
  email:String
 }

`;
