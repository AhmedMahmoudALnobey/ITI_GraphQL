import { users, posts, comments } from './data.js';

export default {
 
  Query: {
    users: () => users,
    user: (args) => users.find(user => user.id === args.id),
    posts: () => posts,
    post: (parent, args) => posts.find(post => post.id === args.id),
    comments: () => comments,
    comment: (parent, args) => comments.find(comment => comment.id === args.id),
    commentsByPost: (parent, args) => comments.filter(comment => comment.postId === args.postId),
    postsByUser: (parent, args) => posts.filter(post => post.userId === args.userId),
  },
  Mutation: {
    addUser: (parent, args) => {
      const newUser = { id: String(users.length + 1), name: args.name };
      users.push(newUser);
      return newUser;
    },
    updateUser: (parent, args) => {
      const user = users.find(user => user.id === args.id);
      if (user) user.name = args.name;
      return user;
    },
    deleteUser: (parent, args) => {
      const index = users.findIndex(user => user.id === args.id);
      if (index !== -1) return users.splice(index, 1)[0];
      return null;
    },
    addPost: (parent, args) => {
      const newPost = { id: String(posts.length + 1), userId: args.userId, title: args.title, content: args.content };
      posts.push(newPost);
      return newPost;
    },
    updatePost: (parent, args) => {
      const post = posts.find(post => post.id === args.id);
      if (post) {
        if (args.title !== undefined) post.title = args.title;
        if (args.content !== undefined) post.content = args.content;
      }
      return post;
    },
    deletePost: (parent, args) => {
      const index = posts.findIndex(post => post.id === args.id);
      if (index !== -1) return posts.splice(index, 1)[0];
      return null;
    },
    addComment: (parent, args) => {
      const newComment = { id: String(comments.length + 1), postId: args.postId, userId: args.userId, text: args.text };
      comments.push(newComment);
      return newComment;
    },
    updateComment: (parent, args) => {
      const comment = comments.find(comment => comment.id === args.id);
      if (comment) comment.text = args.text;
      return comment;
    },
    deleteComment: (parent, args) => {
      const index = comments.findIndex(comment => comment.id === args.id);
      if (index !== -1) return comments.splice(index, 1)[0];
      return null;
    },
  },
   User: {
    posts: (parent) => posts.filter(post => post.userId === parent.id),
  },
  Post: {
    comments: (parent) => comments.filter(comment => comment.postId === parent.id),
  }
};