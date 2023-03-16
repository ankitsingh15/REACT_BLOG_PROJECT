import React, { useContext } from "react";
import "./Topbar.scss";
import { Link, Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Context } from "../../context/Context";
import { useState } from "react";
function Topbar() {
  const { user, dispatch } = useContext(Context);

  const navigate = useNavigate();
  function handleLogout() {
    console.log("Handle Logout");
    dispatch({
      type: "LOGOUT",
    });
  }

  return (
    <div className="topbar">
      <div className="topleft">
        <i className="fa-brands fa-facebook"></i>
        <i className="fa-brands fa-twitter"></i>
        <i className="fa-brands fa-instagram"></i>
        <i className="fa-brands fa-pinterest"></i>
      </div>
      <div className="topcenter">
        <ul className="listitems">
          <li
            className="toplistitem"
            onClick={() => {
              navigate("/");
            }}
          >
            HOME
          </li>
          <li
            className="toplistitem"
            onClick={() => {
              navigate("/");
            }}
          >
            ABOUT
          </li>
          <li
            className="toplistitem"
            onClick={() => {
              navigate("/");
            }}
          >
            CONTACT
          </li>
          <li
            className="toplistitem"
            onClick={() => {
              navigate("/write");
            }}
          >
            WRITE
          </li>
          <li className="toplistitem" onClick={handleLogout}>
            {user && "LOGOUT"}
          </li>
        </ul>
      </div>
      <div className="topright">
        {user ? (
          <Link to={"/settings"}>
            <img
              src={
                user
                  ? user?.ProfilePic?.url
                  : "https://images.pexels.com/photos/1858175/pexels-photo-1858175.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
              }
              alt="Loading"
            />
          </Link>
        ) : (
          <ul className="topright">
            <li className="toplistitem">
              <Link to="/login" className="removelink">
                LOGIN
              </Link>
            </li>
            <li className="toplistitem">
              <Link to="/register" className="removelink">
                REGISTER
              </Link>
            </li>
          </ul>
        )}

        <i className="fa-solid fa-magnifying-glass"></i>
      </div>
    </div>
  );
}

export default Topbar;
