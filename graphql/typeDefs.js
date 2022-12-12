const { gql } = require('apollo-server');



module.exports = gql`
type Post {
    id: ID!
    username: String!
    body: String!
    createdAt: String!
    likes:[Like]!
    likeCount:Int!
  }
  type Like{
    id:ID!
    createdAt:String!
    username:String!
  }
  type User {
    id: ID!
    username: String!
    token: String!
    firstname: String!
    lastname: String!
    email: String!

  }
  input RegisterInput {
    firstname: String!
    lastname: String!
    username: String!
    email: String!
    password: String!
    confirmPassword: String!
  }
  type Query {
    getPosts: [Post]
    getPost(postId:ID!):Post
  }
  type Mutation {
    register(registerInput: RegisterInput): User!
    login(username:String!,password:String!):User!
    createPost(body:String!):Post!
    likePost(postId:ID!):Post!
  }
`;

//createdAt: String!