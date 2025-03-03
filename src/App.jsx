import { useState } from "react";
import bookLogo from "./assets/books.png";
import { Route, Routes } from "react-router-dom";
import Navigations from "./components/Navigations";
import Login from "./components/Login";
import Books from "./components/Books";
import Account from "./components/Account";
import SingleBook from "./components/SingleBook";

function App() {
  const [token, setToken] = useState(null);

  return (
    <>
      <h1>
        <img id="logo-image" src={bookLogo} />
        Library App
      </h1>
      <Navigations token={token} setToken={setToken} />
      <Routes>
        <Route path="/" element={<Books />} />
        <Route path="/login" element={<Login setToken={setToken} />} />
        <Route path="/myaccount" element={<Account token={token} />} />
        <Route path="/:id" element={<SingleBook token={token} />} />
      </Routes>
    </>
  );
}

export default App;
