import React, { useEffect, useState } from "react";
import { Modal, TextField, Button, Box } from "@mui/material";

const ReserveModal = ({ isOpen, onClose, onSave, initialValues }) => {
    const [title, setTitle] = useState("");
    const [reservedBy, setReservedBy] = useState("");
  
    console.log(initialValues);
  
    useEffect(() => {
      if (initialValues) {
        setTitle(initialValues.title || "");
      }
    }, [initialValues]);
  
    const handleSaveReservation = () => {
      onSave({title, reservedBy});
    };
  
    return (
      <Modal
        open={isOpen}
        onClose={onClose}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          p={3}
          borderRadius="20px"
          sx={{
            background: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            width: "50%",
            rowGap: "2rem",
          }}
        >
          <h2>Reservar Libro</h2>
          <TextField
            label="Título del libro"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            disabled
          />
          <TextField
            label="Reservado por"
            value={reservedBy}
            onChange={(e) => setReservedBy(e.target.value)}
          />
  
          <Button variant="contained" onClick={handleSaveReservation}>
            Guardar Reserva
          </Button>
        </Box>
      </Modal>
    );
  };

  
export default ReserveModal;
