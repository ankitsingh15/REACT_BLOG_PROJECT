import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import Header from "../../components/header/Header";
import Posts from "../../components/posts/Posts";
import SideBar from "../../components/sidebar/SideBar";
import "./Home.scss";
import axios from "axios";
import { axiosClient } from "../../utils/axiosClient";
import { useLocation, useParams } from "react-router-dom";

function Home() {
  const [posts, setPosts] = useState([]);
  const params = useParams();
  // console.log("params is", params);
  //Taking only search Property of useLocation
  //Params
  const { search } = useLocation();
  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axiosClient.get("/post" + search);
      setPosts(res.data.result.posts);
      // console.log(posts);
    };
    fetchPosts();
  }, [search]);

  return (
    <div>
      <Header />
      <div className="home">
        <Posts posts={posts} />
        <SideBar />
      </div>
    </div>
  );
}

export default Home;
