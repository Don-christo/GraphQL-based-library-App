import mongoose, { Schema } from 'mongoose';
// import Joi from 'joi';

export interface IBooks extends mongoose.Document {
  _id: string;
  title: string;
  author: string;
  date_published: string;
  description: string;
  page_count: number;
  genre: string;
  publisher: string;
}

const bookSchema = new Schema({
  title: {
    type: String,
    required: [true, 'Please enter book name'],
  },
  author: {
    type: String,
    required: [true, 'Please enter author name'],
  },
  date_published: {
    type: String,
    required: [true, 'Please enter date published'],
  },
  description: {
    type: String,
    required: [true, 'Please provide book description'],
  },
  page_count: {
    type: Number,
    required: [true, 'Please provide page count'],
  },
  genre: {
    type: String,
    required: [true, 'Please enter book genre'],
  },
  publisher: {
    type: String,
    required: [true, 'Please enter publisher name'],
  },
},
 {
  timestamps: true,
});

const Books = mongoose.model<IBooks>('Books', bookSchema);

export default Books;

// export const validateBook = (book: Partial<IBooks>) => {
//   const schema = Joi.object({
//     title: Joi.string().required(),
//     author: Joi.string().required(),
//     date_published: Joi.string().required(),
//     description: Joi.string().required(),
//     page_count: Joi.number().required(),
//     genre: Joi.string().required(),
//     publisher: Joi.string().required(),
//   });

//   return schema.validate(book);
// };
