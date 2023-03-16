import React from "react";
import Post from "../post/Post";
import "./Posts.scss";

function Posts({ posts }) {
  return (
    <div className="posts">
      {posts.map((p) => {
        return <Post key={p._id} post={p} />;
      })}
    </div>
  );
}

export default Posts;
