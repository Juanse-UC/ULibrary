export const createBook = async (book) => {
  console.log(book)
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const message = "Book created";
  try {
      const resp = await fetch(`${BASE_URL}/books/createBook`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(book),
      });

      return message;
  } catch (error) {
    console.log(error)
  }
};
