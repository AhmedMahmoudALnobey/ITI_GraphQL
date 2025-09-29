export const typeDefs =`#graphql

  type User {
    id: ID!
    name: String!
    posts: [Post!]!
  }
  type Post {
    id: ID!
    userId: ID!
    title: String!
    content: String!
    comments: [Comment!]!
  }
  type Comment {
    id: ID!
    postId: ID!
    userId: ID!
    text: String!
  }

  type Query {
    users: [User!]!
    user(id: ID!): User
    posts: [Post!]!
    post(id: ID!): Post
    comments: [Comment!]!
    comment(id: ID!): Comment
    commentsByPost(postId: ID!): [Comment!]!
    postByComment(commentId: ID!): Post
    postsByUser(userId: ID!): [Post!]!
  }

  type Mutation {
    addUser(name: String!): User!
    updateUser(id: ID!, name: String!): User
    deleteUser(id: ID!): User
    addPost(userId: ID!, title: String!, content: String!): Post!
    updatePost(id: ID!, title: String, content: String): Post
    deletePost(id: ID!): Post
    addComment(postId: ID!, userId: ID!, text: String!): Comment!
    updateComment(id: ID!, text: String): Comment
    deleteComment(id: ID!): Comment
  }
`;