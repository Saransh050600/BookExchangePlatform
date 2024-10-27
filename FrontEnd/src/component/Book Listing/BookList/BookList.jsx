import PropTypes from 'prop-types';
import './BookList.css';
// This component displays a list of books filtered by the search query.
// The Edit and Delete buttons are visible only for books created by the current user.
const BookList = ({ books, onEdit, onDelete, currentUserId }) => {
  return (
    <ul className="book-list">
      {books.map((book) => {

        return (
          <li key={book._id} className="book-item">
            <div className="book-details">
              <strong>{book.title}</strong> by {book.author} (Genre: {book.genre}) - {book.condition}
            </div>
            {book.userId === currentUserId && (
              <div className="book-actions">
                <button className="edit-btn" onClick={() => onEdit(book)}>Edit</button>
                <button className="delete-btn" onClick={() => onDelete(book._id)}>Delete</button>
              </div>
            )}
          </li>
        );
      })}
    </ul>
  );
};

BookList.propTypes = {
  books: PropTypes.array.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  currentUserId: PropTypes.string.isRequired,
};

export default BookList;