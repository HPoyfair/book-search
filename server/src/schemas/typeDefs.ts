import { gql } from 'apollo-server-express';

const typeDefs = gql`
  # --- Types ---

  type User {
    _id: ID!
    username: String!
    email: String!
    bookCount: Int
    savedBooks: [Book]
  }

  type Book {
    bookId: String!        # The book's ID from Google Books API.
    authors: [String]
    description: String
    title: String
    image: String
    link: String
  }

  type Auth {
    token: String
    user: User
  }

  # --- Input Types ---

  input BookInput {
  bookId: String!
  authors: [String]
  description: String
  title: String
  image: String    # Change to: image: String
  link: String     # Change to: link: String
}


  # --- Query ---

  type Query {
    me: User
  }

  # --- Mutations ---

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveBook(book: BookInput!): User
    removeBook(bookId: String!): User
  }
`;

export default typeDefs;