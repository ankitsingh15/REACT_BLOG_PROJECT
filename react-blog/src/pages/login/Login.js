import React, { useEffect, useRef } from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../../context/Context";
import { axiosClient } from "../../utils/axiosClient";
import "./Login.scss";

function Login() {
  const userRef = useRef("");
  const passwordRef = useRef("");
  const navigate = useNavigate();
  const { dispatch, isFetching } = useContext(Context);

  async function handleSubmit(e) {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const response = await axiosClient.post("/auth/login", {
        username: userRef.current.value,
        password: passwordRef.current.value,
      });

      if (response.data?.result?.others) {
        dispatch({
          type: "LOGIN_SUCCESS",
          payload: response.data?.result?.others,
        });
        window.location.replace("/");
      } else {
        dispatch({ type: "LOGIN_FAILURE" });
      }
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE" });
    }
  }

  return (
    <div className="login">
      <span className="loginTitle">Login</span>
      <form className="loginForm" onSubmit={handleSubmit}>
        <label>Username</label>
        <input
          className="loginInput"
          type="text"
          placeholder="Enter your username..."
          ref={userRef}
        />
        <label>Password</label>
        <input
          className="loginInput"
          type="password"
          placeholder="Enter your password..."
          ref={passwordRef}
        />
        <button className="loginButton" type="submit" disabled={isFetching}>
          Login
        </button>
      </form>
      <button
        className="loginRegisterButton"
        onClick={() => {
          navigate("/register");
        }}
      >
        Register
      </button>
    </div>
  );
}

export default Login;
