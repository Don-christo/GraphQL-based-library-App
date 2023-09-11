import mongoose, { Schema } from 'mongoose';
import Joi from 'joi';

export interface IUser extends mongoose.Document {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
//   password?: string;
  password: string;   
  role?: string;
  books?: Array<Record<string, string>>;
}

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: [true, 'Please enter your first name'],
    },
    lastName: {
      type: String,
      required: [true, 'Please enter your last name'],
    },
    email: {
      type: String,
      required: [true, 'Please enter your correct email address'],
    },
    password: String,
    role: String,
    books: Array,
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model<IUser>('User', userSchema);

export default User;

export const validateUser = (user: Partial<IUser>) => {
  const schema = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().optional(),
    role: Joi.string().optional(),
    books: Joi.array().items(Joi.object()).optional(),
  });

  return schema.validate(user);
};
