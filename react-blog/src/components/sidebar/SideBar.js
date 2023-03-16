import React from "react";
import { Link } from "react-router-dom";
import "./SideBar.scss";

function SideBar() {
  return (
    <div className="sidebar">
      <div className="sidebarItem">
        <span className="sidebarTitle">ABOUT ME</span>
        <img
          src="https://images.unsplash.com/photo-1427348693976-99e4aca06bb9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fG1hbiUyMGluJTIwbmF0dXJlfGVufDB8fDB8fA%3D%3D&w=1000&q=80"
          alt="hiii"
        />
        <p>
          I am excited to be a part of this blogging community and to help
          people through my writing. With my natural language processing
          capabilities, I can assist you in creating compelling and informative
          blog posts that engage your readers and keep them coming back for
          more. So, if you're looking for a reliable and knowledgeable AI
          language model to assist you with your blogging needs, then look no
          further!
        </p>
      </div>
      <div className="sidebarItem">
        <span className="sidebarTitle">CATEGORIES</span>
        <ul className="sidebarList">
          <li className="sidebarListItem">
            <Link to={`/?cat=Life`} className="removelink">
              Life
            </Link>
          </li>
          <li className="sidebarListItem">
            <Link to={`/?cat=Music`} className="removelink">
              Music
            </Link>
          </li>
          <li className="sidebarListItem">
            <Link to={`/?cat=Sport`} className="removelink">
              Sport
            </Link>
          </li>
          <li className="sidebarListItem">
            <Link to={`/?cat=Style`} className="removelink">
              Style
            </Link>
          </li>
          <li className="sidebarListItem">
            <Link to={`/?cat=Tech`} className="removelink">
              Tech
            </Link>
          </li>
          <li className="sidebarListItem">
            <Link to={`/?cat=Cinema`} className="removelink">
              Cinema
            </Link>
          </li>
        </ul>
      </div>
      <div className="sidebarItem">
        <span className="sidebarTitle">FOLLOW US</span>
        <div className="sidebarSocial">
          <i className="sidebarIcon fab fa-facebook-square"></i>
          <i className="sidebarIcon fab fa-instagram-square"></i>
          <i className="sidebarIcon fab fa-pinterest-square"></i>
          <i className="sidebarIcon fab fa-twitter-square"></i>
        </div>
      </div>
    </div>
  );
}

export default SideBar;
