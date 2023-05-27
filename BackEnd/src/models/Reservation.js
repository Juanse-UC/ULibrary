// models/reservationSchema.js
import * as yup from 'yup';

const reservationSchema = yup.object().shape({
  bookId: yup.string().required(),
  bookTitle: yup.string().required(),
  reservedBy: yup.string().required()
});

export default reservationSchema;
