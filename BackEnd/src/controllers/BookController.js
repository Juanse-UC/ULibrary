import { db } from "../firebase/firebaseConfig.js";
import bookSchema from "../models/Book.js";
import reservationSchema from "../models/Reservation.js";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  getDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore/lite"; 

export const createBook = async (req, res) => {
  try {
    const { title, author, category, reserved } = req.body;

    await bookSchema.validate({
      title,
      author,
      category,
      reserved,
    });

    const docRef = await addDoc(collection(db, "books"), {
      title,
      author,
      category,
      reserved: false,
    });

    const newBook = {
      id: docRef.id,
      title,
      author,
      category,
      reserved: false,
    };

    res.status(201).json(newBook);
  } catch (error) {
    console.error("Error al crear el libro:", error);
    res.status(500).json({ message: "Error al crear el libro" });
  }
};

export const getBooks = async (req, res) => {
  try {
    const querySnapshot = await getDocs(collection(db, "books"));
    const books = [];

    querySnapshot.forEach((doc) => {
      const book = {
        id: doc.id,
        ...doc.data(),
      };
      books.push(book);
    });

    res.status(200).json(books);
  } catch (error) {
    console.error("Error al obtener los libros:", error);
    res.status(500).json({ message: "Error al obtener los libros" });
  }
};

export const getBookById = async (req, res) => {
  try {
    const { id } = req.params;

    const bookRef = doc(db, "books", id);
    const bookSnapshot = await getDoc(bookRef);

    if (bookSnapshot.exists()) {
      const book = {
        id: bookSnapshot.id,
        ...bookSnapshot.data(),
      };

      res.status(200).json(book);
    } else {
      res.status(404).json({ message: "Libro no encontrado" });
    }
  } catch (error) {
    console.error("Error al obtener el libro:", error);
    res.status(500).json({ message: "Error al obtener el libro" });
  }
};

export const updateBook = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, author, category} = req.body;

    console.log(req.body)

    await bookSchema.validate({
      title,
      author,
      category,
    });

    const bookRef = doc(db, "books", id);

    const bookSnapshot = await getDoc(bookRef);
    if (!bookSnapshot.exists()) {
      res.status(404).json({ message: "Libro no encontrado" });
      return;
    }

    await updateDoc(bookRef, {
      title,
      author,
      category,
    });

    res.status(200).json({ message: "Libro actualizado correctamente" });
  } catch (error) {
    console.error("Error al actualizar el libro:", error);
    if (error.name === "ValidationError") {
      res.status(400).json({ message: error.message });
    } else {
      res.status(500).json({ message: "Error al actualizar el libro" });
    }
  }
};

export const deleteBook = async (req, res) => {
  try {
    const { id } = req.params;

    const bookRef = doc(db, "books", id);

    const bookSnapshot = await getDoc(bookRef);
    if (!bookSnapshot.exists()) {
      res.status(404).json({ message: "Libro no encontrado" });
      return;
    }

    await deleteDoc(bookRef);

    res.status(200).json({ message: "Libro eliminado correctamente" });
  } catch (error) {
    console.error("Error al eliminar el libro:", error);
    res.status(500).json({ message: "Error al eliminar el libro" });
  }
};

export const reserveBook = async (req, res) => {
  try {
    const { bookId, bookTitle, reservedBy, startDate, endDate } = req.body;

    await reservationSchema.validate({
      bookId,
      bookTitle,
      reservedBy,

    });

    const reservation = {
      bookId,
      bookTitle,
      reservedBy,
    };

    const reservationRef = await addDoc(
      collection(db, "reservations"),
      reservation
    );

    const reservedBook = {
      id: reservationRef.id,
      ...reservation,
    };

    res.status(201).json(reservedBook);
  } catch (error) {
    console.error("Error al reservar el libro:", error);
    if (error.name === "ValidationError") {
      res.status(400).json({ message: error.message });
    } else {
      res.status(500).json({ message: "Error al reservar el libro" });
    }
  }
};
