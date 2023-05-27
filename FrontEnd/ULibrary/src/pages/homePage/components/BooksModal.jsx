import React, { useEffect, useState } from "react";
import { Box, Button, Modal, TextField } from "@mui/material";

const BookModal = ({ isOpen, onClose, onSave, initialValues, clearFields }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [category, setCategory] = useState("");

  useEffect(() => {
    if (clearFields) {
      setTitle("");
      setAuthor("");
      setCategory("");
    } else if (initialValues) {
      setTitle(initialValues.title || "");
      setAuthor(initialValues.author || "");
      setCategory(initialValues.category || "");
    }
  }, [clearFields, initialValues]);

  const handleSave = () => {
    onSave({ title, author, category });
    setTitle("");
    setAuthor("");
    setCategory("");
  };

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
    >
      <Box p={3} borderRadius="20px" sx={{ background: "#fff" }}>
        <h2>Agregar Libro</h2>
        <TextField
          label="Título"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          sx={{ marginBottom: 2, marginTop: 2 }}
          fullWidth
        />
        <TextField
          label="Autor"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          sx={{ marginBottom: 2 }}
          fullWidth
        />
        <TextField
          label="Categoría"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          sx={{ marginBottom: 2 }}
          fullWidth
        />
        <div sx={{ display: "flex", justifyContent: "flex-end", marginTop: 2 }}>
          <Button variant="contained" onClick={handleSave} color="primary">
            Guardar
          </Button>
        </div>
      </Box>
    </Modal>
  );
};

export default BookModal;
