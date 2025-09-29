let users = [
  { id: '1', name: 'Alice' },
  { id: '2', name: 'Bob' },
  { id: '3', name: 'Charlie' },
  { id: '4', name: 'David' },
  { id: '5', name: 'Eve' },
];

let posts = [
  { id: '1', userId: '1', title: 'First Post', content: 'Hello World' },
  { id: '2', userId: '2', title: 'Second Post', content: 'GraphQL is fun' },
  { id: '3', userId: '3', title: 'Learning GraphQL', content: 'A beginner\'s guide' },
  { id: '4', userId: '4', title: 'My Day', content: 'Sunny weather today!' },
  { id: '5', userId: '5', title: 'Tech Thoughts', content: 'AI is the future' },
];

let comments = [
  { id: '1', postId: '1', userId: '2', text: 'Nice post!' },
  { id: '2', postId: '1', userId: '1', text: 'Thanks!' },
  { id: '3', postId: '2', userId: '1', text: 'Great insight!' },
  { id: '4', postId: '3', userId: '2', text: 'Very helpful!' },
  { id: '5', postId: '4', userId: '3', text: 'Love the positivity!' },
  { id: '6', postId: '5', userId: '1', text: 'Interesting perspective!' },
];

export { users, posts, comments };