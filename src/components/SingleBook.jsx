/* TODO - add your code to create a functional React component that renders details for a single book. Fetch the book data from the provided API. You may consider conditionally rendering a 'Checkout' button for logged in users. */
import { useParams } from "react-router-dom";
import { fetchBook } from "../API";
import { useState, useEffect } from "react";
import { updateBookRegistration } from "../API";
import { fetchBookRegistrations } from "../API";

const SingleBook = ({ token }) => {
  const [book, setBook] = useState(null);
  const [rentedBooks, setRentedBooks] = useState(null);
  const [showButton, setShowButton] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    async function getBook(id) {
      const APIResponse_BOOK = await fetchBook(id);
      setBook(APIResponse_BOOK.book);
      const APIResponse_REGISTERED = await fetchBookRegistrations(token);
      setRentedBooks(APIResponse_REGISTERED.reservation);
    }
    getBook(id);
  }, []);

  return (
    <>
      {book && (
        <div className="book-details">
          <h2>{book.title}</h2>
          <p>
            <em>by {book.author}</em>
          </p>
          <img src={book.coverimage} alt={`Cover of ${book.title}`} />
          <div className="book-description">{book.description}</div>

          {token ? (
            book.available === true ? (
              showButton ? (
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    updateBookRegistration(token, book.id, false);
                    setShowButton(false);
                  }}
                >
                  Check out {book.title}
                </button>
              ) : (
                <p className="success">Registered!</p>
              )
            ) : rentedBooks &&
              rentedBooks.some((e) => e.title === book.title) ? (
              <p className="success">
                You have registered this book. Go to Account to change this.
              </p>
            ) : (
              <p className="error">This book is not available</p>
            )
          ) : (
            <p className="error">Sign in to check availibility of this book</p>
          )}
        </div>
      )}
    </>
  );
};

export default SingleBook;
