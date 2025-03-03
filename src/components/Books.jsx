/* TODO - add your code to create a functional React component that displays all of the available books in the library's catalog. Fetch the book data from the provided API. Users should be able to click on an individual book to navigate to the SingleBook component and view its details. */

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchAllBooks } from "../API";
import { useNavigate } from "react-router-dom";

const Books = () => {
  const [books, setBooks] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function getAllBooks() {
      const APIRESPONSE = await fetchAllBooks();
      setBooks(APIRESPONSE.books);
    }
    getAllBooks();
  }, []);

  console.log(books);

  return (
    <>
      <div className="book-list">
        {books &&
          books.map((book) => {
            return (
              <div className="book-card" key={book.id}>
                <h2 className="title">{book.title}</h2>
                <p>
                  <em>by {book.author}</em>
                </p>
                <img src={book.coverimage} alt={`Cover of ${book.title}`} />
                <br />
                <Link
                  to={`/${book.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    navigate(`/${book.id}`);
                  }}
                >
                  See Details
                </Link>
              </div>
            );
          })}
      </div>
    </>
  );
};

export default Books;
