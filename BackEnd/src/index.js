// backend/index.js
import express from 'express';
import bookRoutes from './routes/bookRoutes.js';
import bodyParser from 'body-parser';
const port = process.env.PORT || 4000;
const app = express();
import cors from 'cors';
app.use(cors());  

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// Rutas de libros
app.use('/api', bookRoutes);

// Iniciar servidor
app.listen(port, () => {
  console.log(`Servidor iniciado en http://localhost:${port}`);
});
