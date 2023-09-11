const typeDefs = `#graphql
    type User {
      id: ID!
      firstName: String!
      lastName: String!
      email: String!
      password: String!
      role: String
      books: Book
      token: String!
    }

    type Book {
        id: ID!
        title: String!
        author: String!
        date_published: String!
        description: String!
        page_count: Int!
        genre: String!
        publisher: String!
    }
     
    type Query {
        getUsers: [User!]!
        getUser(id: ID): User
        getBooks: [Book!]!
        getBook(id: ID): Book
    }
    
    
    input CreateUser {
        firstName: String!,
        lastName: String!,
        email: String!,
        password: String!,
        role: String = "author"
    }
    
    input userLogin {
        email: String!
        password: String!
      }

      type AuthPayload {
        user: User!
        token: String!
      }
     
    input UpdateUserInput {
        id: ID!
        firstName: String
        lastName: String
        email: String
        password: String
        role: String
      }
    
  input CreateBookInput {
      title: String!
      author: String!
      date_published: String!
      description: String!
      page_count: Int!
      genre: String!
      publisher: String!
}

input UpdateBookInput {
  title: String
  author: String
  date_published: String
  description: String
  page_count: Int
  genre: String
  publisher: String
}
input DeleteBookInput {
  id: ID!
}
    
    type Mutation {
        CreateUser(newUser: CreateUser):User
        UserLogin(loginUser: userLogin): AuthPayload!
        UpdateUser(updateUser: UpdateUserInput): User
        DeleteUser(id: ID!): User
        createBook(book: CreateBookInput): Book
        updateBook(id: ID!, updateBook: UpdateBookInput): Book
        deleteBook(deleteBook: DeleteBookInput): Book
    }
`;

export default typeDefs