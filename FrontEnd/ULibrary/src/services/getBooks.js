/* http://localhost:4000/api/books */

const getBooks = async () => {
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  try {
    const response = await fetch(`${BASE_URL}/books`);

    if (!response.ok) {
      throw new Error("Error al obtener los libros.");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

export default getBooks;
