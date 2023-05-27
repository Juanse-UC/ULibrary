export const reserveBook = async (reservationData) => {
  const BASE_URL = import.meta.env.VITE_BASE_URL;

    try {
      const response = await fetch(`${BASE_URL}/books/${reservationData.bookId}/reserve`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reservationData),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
      throw new Error("Error reserving book");
    }
  };
  