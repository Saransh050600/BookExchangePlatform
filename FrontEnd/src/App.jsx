import { Suspense, lazy, useCallback, useEffect, useState } from "react";
import {
    Navigate,
    Route,
    BrowserRouter as Router,
    Routes
} from "react-router-dom";
import { verifyToken } from "./services/authService";

const AddBookForm = lazy(() =>
  import("./component/Book Listing/AddBook/AddBookForm.jsx")
);
const SearchBooks = lazy(() =>
  import("./component/Book Listing/SearchBook/SearchBooks.jsx")
);
const UserProfile = lazy(() =>
  import("./component/Book Listing/UserProfile/UserProfile.jsx")
);
const Home = lazy(() => import("./component/Home/Home.jsx"));
const ForgotPassword = lazy(() =>
  import("./component/User Authentication/Forgot Password/ForgotPassword.jsx")
);
const Login = lazy(() =>
  import("./component/User Authentication/Login/Login.jsx")
);
const Register = lazy(() =>
  import("./component/User Authentication/Register/Register.jsx")
);
const ResetPassword = lazy(() =>
  import("./component/User Authentication/Reset Password/ResetPassword.jsx")
);

const App = () => {
  const [auth, setAuth] = useState(() => {
    return localStorage.getItem("token") ? true : false; //Get Token from local Storage
  });

  const checkToken = useCallback(async () => {
    const token = localStorage.getItem("token");
    console.log("Checking token:", token);

    if (token) {
      try {
        const response = await verifyToken(token);
        console.log("Token verification response:", response);
        if (response.status === 200) {
          console.log("Token is valid, setting auth to true.");
          setAuth(true); // Valid token
        } else {
          console.log("Token is invalid, setting auth to false.");
          setAuth(false);
        }
      } catch (error) {
        console.error("Token verification failed:", error);
        setAuth(false);
      }
    } else {
      console.log("No token found, setting auth to false.");
      setAuth(false);
    }
  }, []);

  useEffect(() => {
    checkToken(); // Check token validity
  }, [checkToken]);

  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route
            path="/login"
            element={
              auth ? <Navigate to="/home" /> : <Login setAuth={setAuth} />
            }
          />
          <Route
            path="/home"
            element={
              auth ? <Home setAuth={setAuth} /> : <Navigate to="/login" />
            }
          />
          <Route path="/signup" element={<Register />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
          <Route
            path="/resetpassword/:resetToken"
            element={<ResetPassword />}
          />
          <Route path="*" element={<Navigate to="/login" />} />
          <Route
            path="/books"
            element={auth ? <AddBookForm /> : <Navigate to="/login" />}
          />
          <Route
            path="/search-books"
            element={auth ? <SearchBooks /> : <Navigate to="/login" />}
          />
          <Route
            path="/profile"
            element={auth ? <UserProfile /> : <Navigate to="/login" />}
          />
        </Routes>
      </Suspense>
    </Router>
  );
};

export default App;
