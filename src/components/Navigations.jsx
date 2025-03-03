/* TODO - add your code to create a functional React component that renders a navigation bar for the different views in your single page application. You may consider conditionally rendering some options - for example 'Login' should be available if someone has not logged in yet. */
import { Link } from "react-router-dom";
const Navigations = ({ token, setToken }) => {
  return (
    <>
      <nav id="navbar">
        <Link to="/">Home</Link>
        {token ? (
          <>
            <Link to="/myaccount">Account</Link>
            <Link
              to="/"
              onClick={() => {
                setToken(false);
              }}
            >
              Logout
            </Link>
          </>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </nav>
    </>
  );
};

export default Navigations;
