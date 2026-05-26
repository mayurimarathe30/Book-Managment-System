import axios from "axios";

const API_URL = "https://6a15b0cb91ff9a63de089ff5.mockapi.io/books";

// GET books
export const getBooks = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// ADD book
export const addBook = async (book) => {
  const response = await axios.post(API_URL, book);
  return response.data;
};

// UPDATE book
export const updateBook = async (id, book) => {
  const response = await axios.put(`${API_URL}/${id}`, book);
  return response.data;
};

// DELETE book
export const deleteBook = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};
