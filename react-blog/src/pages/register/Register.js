import React from "react";
import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { axiosClient } from "../../utils/axiosClient";
import "./Register.scss";

function Register() {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [email, setEmail] = useState();
  const navigate = useNavigate();
  const [error, setError] = useState(false);

  async function handleSubmit(e) {
    setError(true);
    e.preventDefault();
    const result = await axiosClient.post("/auth/register", {
      username,
      email,
      password,
    });
    if (result.data?.result) {
      navigate("/login");
    } else {
      setError(true);
    }

    console.log("Register Result", result);
  }

  return (
    <div className="register">
      <span className="registerTitle">Register</span>
      <form className="registerForm" onSubmit={handleSubmit}>
        <label>Username</label>
        <input
          className="registerInput"
          type="text"
          placeholder="Enter your username..."
          onChange={(e) => setUsername(e.target.value)}
        />
        <label>Email</label>
        <input
          className="registerInput"
          type="text"
          placeholder="Enter your email..."
          onChange={(e) => setEmail(e.target.value)}
        />
        <label>Password</label>
        <input
          className="registerInput"
          type="password"
          placeholder="Enter your password..."
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="registerButton" type="submit">
          Register
        </button>
      </form>
      <button className="registerLoginButton">
        <Link to={"/login"} className="removelink">
          Login
        </Link>
      </button>
      {error && <h2 className="wentWrong">Something went Wrong!!Try Again</h2>}
    </div>
  );
}

export default Register;
