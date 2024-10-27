import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addBook } from "../../../services/bookService.js";
import { getDecodedUserId } from "../../../utils/jwtDecode.js";
import "../BookListing.css";

const AddBookForm = () => {
  const [book, setBook] = useState({
    title: "",
    author: "",
    genre: "",
    condition: "",
    availabilityStatus: "Available"
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleChange = (event) => {
    ///Setting the value of the changed input field based on its name
    setBook({ ...book, [event.target.name]: event.target.value });
  };

  const handleBackButton = () => {
    //Navigate to Home Page
    navigate("/home");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const token = localStorage.getItem("token");
    //Get UserId using Decoded Token
    const userId = getDecodedUserId(token);
    if (userId) {
      try {
        //Call addBook function from BookService
        await addBook({ ...book, userId }, token);
        setBook({
          title: "",
          author: "",
          genre: "",
          condition: "",
          availabilityStatus: "Available"
        });
        setSuccess("Book added successfully!");
        setError("");
      } catch (error) {
        setError(error.message || "An error occurred");
        setSuccess("");
      }
    } else {
      setError("Invalid or missing user token");
    }
  };

  return (
    <div className="container">
      <div className="back-button">
        <button onClick={handleBackButton}>Back</button>
      </div>
      <h2>Add Book</h2>
      {success && <p style={{ color: "green" }}>{success}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form className="book-form" onSubmit={handleSubmit}>
        <input
          className="input-field"
          type="text"
          name="title"
          placeholder="Title"
          value={book.title}
          onChange={handleChange}
          required
        />
        <input
          className="input-field"
          type="text"
          name="author"
          placeholder="Author"
          value={book.author}
          onChange={handleChange}
          required
        />
        <input
          className="input-field"
          type="text"
          name="genre"
          placeholder="Genre"
          value={book.genre}
          onChange={handleChange}
          required
        />
        <input
          className="input-field"
          type="text"
          name="condition"
          placeholder="Condition"
          value={book.condition}
          onChange={handleChange}
          required
        />
        <select
          className="select-field"
          name="availabilityStatus"
          value={book.availabilityStatus}
          onChange={handleChange}
          required
        >
          <option value="Available">Available</option>
          <option value="Unavailable">Unavailable</option>
        </select>
        <button className="button" type="submit">
          Add Book
        </button>
      </form>
    </div>
  );
};

export default AddBookForm;
