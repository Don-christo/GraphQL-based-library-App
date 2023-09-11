import User from '../models/userModels';
// import Books from '../models/booksModels'
import Books, { IBooks } from '../models/booksModels';
import { SaltGenerator, hashPassword, tokenGenerator } from '../utility/auth';
import bcrypt from 'bcrypt';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { CreateBookInput, UpdateBookInput, DeleteBookInput } from './type-defs';



const resolvers = {
   Query: {
    getUsers: async () => {
        try {
            const users = await User.find();

            return users;
        } catch (error) {
            console.log(error)
        }
    },

    getUser: async (_: unknown, {id}:{id:String}) => {
          try {
             const user = await User.findById(id)

             return user;
          } catch (error) {
            console.log(error)
          }
    }, 
    getBooks: async () => {
        try {
            const books = await Books.find();
            return books;
        } catch (error) {
            console.log(error)
        }
    },

    getBook: async (_: unknown, {id}:{id:String}) => {
        try {
           const Book = await Books.findById(id)

           return Book;
        } catch (error) {
          console.log(error)
        }
    }
   },

//    MUTATIONS
      Mutation: {
        // CREATE USER
     CreateUser: async (_: unknown, userData: any) => {

        try {
        const {firstName, lastName, email, password,role} = await userData.newUser;

        if (!password) {
            throw new Error('Password is required.');
          }

        const salt = await SaltGenerator();
        const hashedPassword = await hashPassword(password, salt);

      const newUserWithHashedPassword = {
        firstName,
        lastName,
        email,
        password: hashedPassword,
        role,
      }
      const newUser = await User.create(newUserWithHashedPassword);
           return newUser
        } catch (error) {
            console.log(error)
        }
     },
         
    //  USER LOGIN
     UserLogin: async (_: unknown, { loginUser }: any) => {
          const { email, password } = loginUser;
          const user = await User.findOne({ email });
      
          if (!user) {
            throw new Error('Invalid credentials. Please check your email.');
          }
      
          const validate = await bcrypt.compare(password, user.password);
      
          if (!validate) {
            throw new Error('Invalid Login');
          }
      
          const token = jwt.sign(user.toObject(), 'mySecret', {
            expiresIn: '7d', 
          });
      
          return {
            user,
            token,
          };
        },

        // UPDATE USER
        UpdateUser: async (_: unknown, { updateUser }: any) => {
            const { id, firstName, lastName, email, password, role } = updateUser;
        
            // Check if the user exists
            const existingUser = await User.findById(id);
            if (!existingUser) {
              throw new Error('User not found');
            }
        
            // Update user fields if provided
            if (firstName) existingUser.firstName = firstName;
            if (lastName) existingUser.lastName = lastName;
            if (email) existingUser.email = email;
            if (password) {
              const hashedPassword = await bcrypt.hash(password, 10);
              existingUser.password = hashedPassword;
            }
            if (role) existingUser.role = role;
        
            // Save the updated user
            const updatedUser = await existingUser.save();
            return updatedUser;        
        },

        // DELETE USER    
        DeleteUser: async (_: unknown, { id }: any) => {
            // Check if the user exists
            try {
                const existingUser = await User.findByIdAndDelete(id);
            if (!existingUser) {
              throw new Error('User not found');
            }
              return existingUser;
            } catch (error) {
                throw new Error('Failed to delete user.');
            }
           
            },

            // BOOK MUTATION
            // createBook: async (_: unknown, CreateBookInput:any, context: any) => {
            //   try {
            //   const token = context.req.headers.authorization || '';
            //   // console.log("Token",token)
            //   const decodedToken = jwt.verify(token, 'mySecret') as JwtPayload;
            //   // console.log("first", decodedToken)
            //   const user = await User.findById(decodedToken._id);
            
            //   if (!user) {
            //     throw new Error('User not authenticated.');
            //   }
            

            //   const findBook = await Books.findOne({ title: CreateBookInput.title });
            
            //   if (findBook) {
            //     throw new Error('Book already exists');
            //   }
            
            //     const book: IBooks = await Books.create(CreateBookInput);
            //     return book;
            //   } catch (error) {
            //     console.log(error);
            //     throw new Error('Failed to create Book');
            //   }
            // }

            createBook: async (_: unknown, { book }: { book: CreateBookInput }, context: any) => {
              try {
                  const token = context.req.headers.authorization || '';
                  const decodedToken = jwt.verify(token, 'mySecret') as JwtPayload;
                  const user = await User.findById(decodedToken._id);
                
                  if (!user) {
                      throw new Error('User not authenticated.');
                  }
          
                  const findBook = await Books.findOne({ title: book.title });
          
                  if (findBook) {
                      throw new Error('Book already exists');
                  }
          
                  const newBook: IBooks = await Books.create(book);
                  return newBook;
              } catch (error) {
                  console.log(error);
                  throw new Error('Failed to create Book');
              }
            },

          updateBook: async (_: unknown, { id, updateBook }: { id: string, updateBook: UpdateBookInput }, context: any) => {
              try {
                const token = context.req.headers.authorization || '';
                const decodedToken = jwt.verify(token, 'mySecret') as JwtPayload;
                const user = await User.findById(decodedToken._id);
            
                if (!user) {
                  throw new Error('User not authenticated.');
                }
            
                // Check if the book exists
                const book = await Books.findById(id);
                if (!book) {
                  throw new Error('Book not found.');
                }
            
                // Update the book document based on the provided update data
                if (updateBook.title) {
                  book.title = updateBook.title;
                }
                if (updateBook.author) {
                  book.author = updateBook.author;
                }
                if (updateBook.date_published) {
                  book.date_published = updateBook.date_published;
                }
                if (updateBook.description) {
                  book.description = updateBook.description;
                }
                if (updateBook.page_count) {
                  book.page_count = updateBook.page_count;
                }
                if (updateBook.genre) {
                  book.genre = updateBook.genre;
                }
                if (updateBook.publisher) {
                  book.publisher = updateBook.publisher;
                }
            
                // Save the updated book to the database
                const updatedBook = await book.save();
                return updatedBook;
              } catch (error) {
                console.log(error);
                throw new Error('Failed to update book information.');
              }
            },


          deleteBook:async (_: unknown, { deleteBook }: { deleteBook: DeleteBookInput }, context: any) => {
              try {
                const token = context.req.headers.authorization || '';
                const decodedToken = jwt.verify(token, 'mySecret') as JwtPayload;
                const user = await User.findById(decodedToken._id);
            
                if (!user) {
                  throw new Error('User not authenticated.');
                }
            
                // Check if the book exists
                const book = await Books.findByIdAndDelete(deleteBook.id);
                if (!book) {
                  throw new Error('Book not found.');
                }
                
                return book;
              } catch (error) {
                console.log(error);
                throw new Error('Failed to delete the book.');
              }
            }
            
            
            
      
      }
    }
export default resolvers