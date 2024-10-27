import PropTypes from 'prop-types';
import { useState } from 'react';
import { updateBook } from '../../../services/bookService';
import '../BookListing.css';

const EditBookForm = ({ book, onClose, onUpdate }) => {
  const [formData, setFormData] = useState({
    title: book.title,
    author: book.author,
    genre: book.genre,
    condition: book.condition,
    availabilityStatus: book.availabilityStatus,
    userId: book.userId, 
    createdAt: book.createdAt, 
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
  
    try {
      // Call the updateBook function to send the update request
      const updatedBook = await updateBook(book._id, formData);
      console.log("Updated Book Response:", updatedBook); 
  
      onUpdate(updatedBook);
      onClose(); // Close the form on Cancel
    } catch (error) {
      console.error("Error updating book:", error);
    }
  };

  return (
    <div className="box">
    <h2>Edit Book</h2>
    <form onSubmit={handleSubmit}>
        <input
            className="input-field"
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
        />
        <input
            className="input-field"
            type="text"
            name="author"
            value={formData.author}
            onChange={handleChange}
            required
        />
        <input
            className="input-field"
            type="text"
            name="genre"
            value={formData.genre}
            onChange={handleChange}
            required
        />
        <input
            className="input-field"
            type="text"
            name="condition"
            value={formData.condition}
            onChange={handleChange}
            required
        />
        <select
            className="select-field"
            name="availabilityStatus"
            value={formData.availabilityStatus}
            onChange={handleChange}
        >
            <option value="Available">Available</option>
            <option value="Unavailable">Unavailable</option>
        </select>
        <div className="button-group">
            <button className="button" type="submit">Update Book</button>
            <button className="button" type="button" onClick={onClose}>Cancel</button>
        </div>
    </form>
</div>
  );
};

EditBookForm.propTypes = {
  book: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default EditBookForm;
