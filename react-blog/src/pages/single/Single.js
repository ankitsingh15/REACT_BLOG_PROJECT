import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import SideBar from "../../components/sidebar/SideBar";
import SinglePost from "../../components/singlepost/SinglePost";
import { axiosClient } from "../../utils/axiosClient";
import "./single.scss";

function Single() {
  return (
    <div className="single">
      <SinglePost />
      <SideBar />
    </div>
  );
}

export default Single;
