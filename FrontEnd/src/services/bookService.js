import axios from "axios";
import { baseURL } from "../utils/ServerURL";

export const addBook = async (bookData, token) => {
  try {
    //POST request to add a book with book data and authorization token in headers
    const response = await axios.post(`${baseURL}/book`, bookData, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error?.response?.data?.message || "An error occurred");
  }
};
export const searchBooks = async (query) => {
   try{
    // Convert query object to a query string, encoding each value for URL compatibility
    const queryString = Object.entries(query)
    .filter(([, value]) => value !== "")
    .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
    .join("&");

  const token = localStorage.getItem("token");
  //Send GET request to search books
  const response = await axios.get(`${baseURL}/books?${queryString}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}catch (error) {
  throw new Error(error?.response?.data?.message || "An error occurred");
}
} 
  
export const deleteBook = async (bookId) => {
    try{
      const token = localStorage.getItem("token");
      //Send DELETE request for the book ID with token as a header
    await axios.delete(`${baseURL}/book/${bookId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }catch (error) {
      throw new Error(error?.response?.data?.message || "An error occurred");
    }
};

export const updateBook = async (bookId, formData) => {
  try {
    const token = localStorage.getItem("token");
    //Send PUT request to update the Book Data
    const response = await axios.put(`${baseURL}/book/${bookId}`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data; // Return the updated book data
  } catch (error) {
    throw new Error(error?.response?.data?.message || "Error updating book");
  }
};

export const fetchMyBooks = async () => {
  try {
    const token =localStorage.getItem("token");
    const response = await axios.get(`${baseURL}/my-books`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error?.response?.data?.message || "Error Fetching books");
  }
};