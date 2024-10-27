import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteBook, fetchMyBooks } from "../../../services/bookService";
import EditBookForm from "../EditBook/EditBookForm";
import "./UserProfile.css";

const UserProfile = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editingBook, setEditingBook] = useState(null);
  const navigate = useNavigate();


  const fetchBooks = async () => {
    setLoading(true);
    try {
      const bookData = await fetchMyBooks(); // Call the function to fetch books
      setBooks(bookData);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteBook(id); // Call the deleteBook from BookService
      fetchBooks(); // Refresh the book list after deletion
    } catch (err) {
      console.error("Error deleting book:", err.message);
    }
  };

  const handleEdit = (book) => {
    setEditingBook(book);
  };

  const handleCloseEdit = () => {
    setEditingBook(null);
  };

  const handleUpdate = (updatedBook) => {
    setBooks((prevBooks) =>
      // Map through the books and update the matching book by ID
      prevBooks.map((book) =>
        book._id === updatedBook._id ? updatedBook : book
      )
    );
  };

  const handleBackButton = () => {
    //Navigate to Home Page
    navigate("/home");
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (error)
    return (
      <div className="error" style={{ color: "red" }}>
        {error}
      </div>
    );

  return (
    <div className="user-profile">
      <div className="Back-button">
        <button onClick={handleBackButton}>Back</button>
      </div>
      <h2 className="profile-heading">Your Book Listings</h2>
      {books.length > 0 ? (
        <ul className="book-list">
          {books.map((book) => (
            <li key={book._id} className="book-item">
              <div className="book-info">
                <span className="book-title">{book.title}</span> by{" "}
                {book.author}
                <div className="book-details">
                  (Genre: {book.genre}, Condition: {book.condition}, Status:{" "}
                  {book.availabilityStatus})
                </div>
              </div>
              <button className="edit-button" onClick={() => handleEdit(book)}>
                Edit
              </button>
              <button
                className="delete-button"
                onClick={() => handleDelete(book._id)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="no-books-message">No books found.</p>
      )}
      {editingBook && (
        <EditBookForm
          book={editingBook}
          onClose={handleCloseEdit}
          onUpdate={handleUpdate}
        />
      )}
    </div>
  );
};

export default UserProfile;
