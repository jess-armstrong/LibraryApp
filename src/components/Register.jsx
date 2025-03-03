/* TODO - add your code to create a functional React component that renders a registration form */

import { useState } from "react";
import { registerUser } from "../API";
import { useNavigate } from "react-router-dom";

const Register = ({ setToken }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const APIRESPONSE = await registerUser(
        firstName,
        lastName,
        email,
        password
      );
      const result = APIRESPONSE;
      console.log(result);
      if (result.name) {
        setError(result.message);
      } else {
        setToken(result.token);
        setError(null);
        setSuccess("Registered!");
        setFirstName("");
        setLastName("");
        setEmail("");
        setPassword("");
      }
    } catch (error) {
      setError(error.message);
      setSuccess(null);
    }
  }

  return (
    <>
      <h2>Register</h2>
      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}
      <form onSubmit={handleSubmit}>
        <label>
          First Name:{" "}
          <input
            required
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </label>
        <br />

        <label>
          Last Name:{" "}
          <input
            required
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </label>
        <br />

        <label>
          Email:{" "}
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <br />

        <label>
          Password:{" "}
          <input
            type="password"
            required
            minLength={5}
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </label>
        <br />
        <button>Submit</button>
      </form>
    </>
  );
};

export default Register;
