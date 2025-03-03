/* TODO - add your code to create a functional React component that renders a login form */

import { useState } from "react";
import { loginUser } from "../API";
import { useNavigate } from "react-router-dom";
import Register from "./Register";

const Login = ({ setToken }) => {
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const APIRESPONSE = await loginUser(email, password);
      const result = APIRESPONSE;
      if (result.name) {
        setError(result.message);
      } else {
        setToken(result.token);
        setError(null);
        setSuccess("logged in!");
        setEmail("");
        setPassword("");
        navigate("/myaccount");
      }
    } catch (error) {}
  }
  return (
    <>
      <h2>Login</h2>
      {error && <p className="error">{error}</p>}
      {success && <p className="success">{navigate("/myaccount")}</p>}
      <form onSubmit={handleSubmit}>
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
        <br />
      </form>
      <Register setToken={setToken} />
    </>
  );
};

export default Login;
