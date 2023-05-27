export const deleteBook = async (id) => {
  const BASE_URL = import.meta.env.VITE_BASE_URL;

    try {
        
      const response = await fetch(`${BASE_URL}/books/deleteBook/${id}`, {
        method: "DELETE",
        headers: {
            "content-type": "application/json",
          },
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
      throw new Error("Error deleting book");
    }
  };
  