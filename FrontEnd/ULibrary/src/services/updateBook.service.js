
export const updateBook = async(id, bookData) => {
  const BASE_URL = import.meta.env.VITE_BASE_URL;
    console.log(id, bookData) 

    try {
        const resp = await fetch(`${BASE_URL}/books/updateBook/${id}`,{
            method: "PUT",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify(bookData),
        })
        console.log(resp)
    } catch (error) {
        console.log(error)
    }
}
