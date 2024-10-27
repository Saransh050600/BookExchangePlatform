import PropTypes from "prop-types";
import { FaPlus, FaSearch, FaSignOutAlt, FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import './Home.css';

const Home = ({ setAuth }) => { 
    const navigate = useNavigate();

    const handleSignOut = () => {
        //When clicked Sign Out , Remove the token and navigate the user to Login Page
        localStorage.removeItem("token");
        setAuth(false); 
        navigate('/login');
    };

    const handleAddBook = () => {
        //Navigate to Add Books Page
        navigate('/books');
    };

    const handleSearchBooks = () => {
        //Navigate to Serach Books Page
        navigate('/search-books');
    };
    const handleProfile = () => {
        //Navigate to Your Book Listing Page
        navigate('/profile');
    };

    return (
        <div className="home-container">
            <h1>Welcome to Book Exchange Platform</h1>
            <p>Manage your book collection effortlessly</p>
            <div className="button-group">
                <button onClick={handleSignOut} className="home-button">
                    <FaSignOutAlt /> Sign Out
                </button>
                <button onClick={handleAddBook} className="home-button">
                    <FaPlus /> Add Book
                </button>
                <button onClick={handleSearchBooks} className="home-button">
                    <FaSearch /> Search Books
                </button>
                <button onClick={handleProfile} className="home-button">
                    <FaUser /> Profile
                </button>
            </div>
        </div>
    );
};

Home.propTypes = {
    setAuth: PropTypes.func.isRequired,
};

export default Home;
