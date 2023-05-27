// models/bookSchema.js
import * as yup from 'yup';

const bookSchema = yup.object().shape({
  title: yup.string().required(),
  author: yup.string().required(),
  category: yup.string().required(),
});

export default bookSchema;
