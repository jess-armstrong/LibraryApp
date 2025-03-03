/* TODO - add your code to create a functional React component that renders account details for a logged in user. Fetch the account data from the provided API. You may consider conditionally rendering a message for other users that prompts them to log in or create an account.  */

import { fetchUser } from "../API";
import { fetchBookRegistrations } from "../API";
import { deleteBookRegistration } from "../API";
import { useEffect, useState } from "react";
const Account = ({ token }) => {
  const [user, setUser] = useState(null);
  const [books, setBooks] = useState(null);
  const [deleteBook, setDeleteBook] = useState(null);

  useEffect(() => {
    async function getUser(token) {
      const APIRESPONSE_USER = await fetchUser(token);
      const APIRESPONSE_BOOKS = await fetchBookRegistrations(token);
      setUser(APIRESPONSE_USER);
      setBooks(APIRESPONSE_BOOKS.reservation);
    }
    getUser(token);
  }, [deleteBook]);

  async function handleDelete(token, resId) {
    try {
      const APIRESPONSE = await deleteBookRegistration(token, resId);
      setDeleteBook(APIRESPONSE);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <h2>My Account</h2>
      {console.log(user)}
      {user && (
        <>
          <p>First Name: {user.firstname}</p>
          <p>Last Name: {user.lastname}</p>
          <p>Email: {user.email}</p>
        </>
      )}
      <h2>Your Registrations:</h2>
      {books &&
        (books.length > 0 ? (
          books.map((book) => {
            return (
              <>
                <p key={book.id}>{book.title}</p>
                <button
                  key={`${book.id}-resId`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleDelete(token, book.id);
                    setDeleteBook(true);
                  }}
                >
                  delete reservation
                </button>
              </>
            );
          })
        ) : (
          <p>No books registered</p>
        ))}
    </>
  );
};

export default Account;
