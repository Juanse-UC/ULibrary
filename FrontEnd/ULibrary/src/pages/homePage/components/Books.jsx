import { Box, Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import getBooks from "../../../services/getBooks";
import BookModal from "./BooksModal";
import { updateBook } from "../../../services/updateBook.service";
import { createBook } from "../../../services/createBook.service";
import { deleteBook } from "../../../services/deleteBook.service";
import ReserveModal from "../ReserveModal";
import { reserveBook } from "../../../services/reserveBook.service";

const Books = () => {
  const [books, setBooks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const booksResponse = await getBooks();
        setBooks(booksResponse);
      } catch (error) {
        console.error(error);
      }
    };

    fetchBooks();
  }, []);

  const handleBookClick = (id) => {
    const book = books.find((book) => book.id === id);
    setSelectedBook(book);
  };

  const handleModalClose = () => {
    setSelectedBook(null);
    setIsModalOpen(false);
  };

  const handleCreateBook = () => {
    setSelectedBook(null);
    setIsModalOpen(true);
  };

  const handleUpdateBook = () => {
    if (selectedBook) {
      setIsModalOpen(true);
    }
  };

  const handleDeleteBook = async () => {
    if (selectedBook) {
      try {
        await deleteBook(selectedBook.id);
        setBooks((prevBooks) =>
          prevBooks.filter((book) => book.id !== selectedBook.id)
        );
        setSelectedBook(null);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleSaveAction = async (bookData) => {
    console.log(bookData);
    if (selectedBook) {
      await updateBook(selectedBook.id, bookData);
    } else {
      await createBook(bookData);
    }
    const updatedBooks = await getBooks();
    setBooks(updatedBooks);
    setIsModalOpen(false);
    setSelectedBook(null);
  };

  return (
    <Box m={"4rem"} display="flex" justifyContent="space-around">
      <Box
        width="50%"
        height="40rem"
        display="flex"
        flexDirection="column"
        alignItems="center"
        border="1px solid navy"
        borderRadius="10px"
        padding="1rem"
        overflow="scroll"
      >
        <h1>BOOKS</h1>

        {books.length > 0 &&
          books.map((book) => (
            <Box
              key={book.id}
              border={
                selectedBook && selectedBook.id === book.id
                  ? "2px solid red" // Color para el libro seleccionado
                  : "1px solid gray"
              }
              boxShadow="0 0 5px 0px black"
              width="35%"
              p="1rem"
              borderRadius="12px"
              sx={{ cursor: "pointer" }}
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
              rowGap="1rem"
              m="0.5rem"
              onClick={() => handleBookClick(book.id)} // Llamada al hacer clic en el libro
            >
              <h3>{book.title}</h3>
              <li>Autor: {book.author}</li>
              <li>Categoría: {book.category}</li>
            </Box>
          ))}
      </Box>
      <Box
        width="40%"
        columnGap="1rem"
        display="flex"
        height="3rem"
        m="1rem"
        justifyContent="center"
      >
        <Button variant="contained" color="success" onClick={handleCreateBook}>
          Crear Libro
        </Button>
        <Button
          variant="contained"
          onClick={handleUpdateBook}
          disabled={!selectedBook} 
        >
          Actualizar Libro
        </Button>
        <Button
          variant="contained"
          color="error"
          onClick={handleDeleteBook}
          disabled={!selectedBook} 
        >
          Eliminar Libro
        </Button>

        <BookModal
          isOpen={isModalOpen}
          onClose={handleModalClose}
          onSave={handleSaveAction}
          initialValues={selectedBook}
          clearFields={!selectedBook}
        />
      </Box>
    </Box>
  );
};

export default Books;
