// src/components/SearchBooks/SearchBooks.jsx
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { deleteBook, searchBooks } from "../../../services/bookService";
import { getDecodedUserId } from "../../../utils/jwtDecode";
import BookList from "../BookList/BookList";
import "../BookListing.css";
import EditBookForm from "../EditBook/EditBookForm";

const SearchBooks = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState({
    title: searchParams.get("title") || "",
    author: searchParams.get("author") || "",
    genre: searchParams.get("genre") || "",
  });
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [currentUserId, setCurrentUserId] = useState(null);
  const [currentPage, setCurrentPage] = useState(Number(searchParams.get("page")) || 1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTriggered, setSearchTriggered] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    //Get UserId using token stored in local Staorage
    const token = localStorage.getItem("token");
    const userId = getDecodedUserId(token);
    setCurrentUserId(userId);
  }, []);

  useEffect(() => {
    //Reset Search if the page is reloaded
    const resetSearch = () => {
      setSearchQuery({ title: "", author: "", genre: "" });
      setCurrentPage(1);
      setBooks([]);
      setSearchTriggered(false);
      setSearchParams({});
    };

    if (window.location.pathname === "/search-books") {
      resetSearch();
    }
  }, [window.location.pathname]);

  useEffect(() => {
    //Function to fetch books based on the search query and current page
    const fetchBooks = async () => {
      try {
        const query = {
          ...searchQuery,
          page: currentPage, //Add pagination to the search query
        };
        //Call searchBooks function from bookService
        const { books, total } = await searchBooks(query); 
        setBooks(books);
        setTotalPages(Math.ceil(total / 10)); //Calculate and set total pages based on results
        setSearchTriggered(false);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };

    if (searchTriggered) {
      //Call fetchBooks function if Search is triggered
      fetchBooks(); 
    }
  }, [searchTriggered, currentPage, searchQuery]);

  const handleChange = (e) => {
    setSearchQuery({ ...searchQuery, [e.target.name]: e.target.value });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setCurrentPage(1); 
    setSearchTriggered(true); // Trigger a search action to refresh results
    setSearchParams({ ...searchQuery, page: 1 });
    navigate(`/search-books?${new URLSearchParams({ ...searchQuery, page: 1 })}`); // Update URL with query parameters
  };

  //Function to handle advancing to the next page of search results
  const handleNextPage = () => {
    const nextPage = currentPage + 1;
    setCurrentPage(nextPage);
    setSearchTriggered(true); 
    setSearchParams({ ...searchQuery, page: nextPage }); 
  };

  //Function to handle advancing to the Previous page of search results
  const handlePrevPage = () => {
    const prevPage = currentPage - 1;
    setCurrentPage(prevPage);
    setSearchTriggered(true); 
    setSearchParams({ ...searchQuery, page: prevPage }); 
  };

  const handleEdit = (book) => {
    setSelectedBook(book._id !== selectedBook?._id ? book : null);
  };

  // Function to handle updating a specific book in the list
  const handleUpdate = (updatedBook) => {
    setBooks((prevBooks) =>
      // Map through the books and update the matching book by ID
      prevBooks.map((book) => (book._id === updatedBook._id ? { ...book, ...updatedBook } : book))
    );
    setSelectedBook(null);
  };

  const handleDelete = async (bookId) => {
    try {
      //Delete the selected Book by calling deleteBook Function from BookService
      await deleteBook(bookId);
      // Update the state to remove the deleted book from the list
      setBooks((prevBooks) => prevBooks.filter((book) => book._id !== bookId));
    } catch (error) {
      console.error("Error deleting book:", error);
    }
  };

  const handleCloseEdit = () => {
    setSelectedBook(null);
  };

  const handleBackButton = () => {
    //Navigate to Home Page
    navigate('/home');
  };


  return (
    <div className="container">
    <div className="back-button">
        <button onClick={handleBackButton}>Back</button>
    </div>
    <div className="box">
        <h2>Search Books</h2>
        <form className="book-form" onSubmit={handleSearch}>
            <input
                className="input-field"
                type="text"
                placeholder="Title"
                name="title"
                value={searchQuery.title}
                onChange={handleChange}
            />
            <input
                className="input-field"
                type="text"
                placeholder="Author"
                name="author"
                value={searchQuery.author}
                onChange={handleChange}
            />
            <input
                className="input-field"
                type="text"
                placeholder="Genre"
                name="genre"
                value={searchQuery.genre}
                onChange={handleChange}
            />
            <button className="button" type="submit">
                Search
            </button>
        </form>

        <div className="results">
            <h3>Search Results:</h3>
            {books.length > 0 ? (
                <>
                    <BookList
                        books={books}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                        currentUserId={currentUserId}
                    />
                    {selectedBook && (
                        <EditBookForm
                            book={selectedBook}
                            onClose={handleCloseEdit}
                            onUpdate={handleUpdate}
                        />
                    )}
                    <div className="pagination">
                        <button onClick={handlePrevPage} disabled={currentPage === 1}>
                            Previous
                        </button>
                        <span>{` Page ${currentPage} of ${totalPages} `}</span>
                        <button onClick={handleNextPage} disabled={currentPage === totalPages}>
                            Next
                        </button>
                    </div>
                </>
            ) : (
                <p>No books found</p>
            )}
        </div>
    </div>
</div>

  );
};

export default SearchBooks;
