import React from "react";
import { Link } from "react-router-dom";
import "./Post.scss";

function Post({ post }) {
  return (
    <div className="post">
      {post?.photo && (
        <img className="postImg" src={post?.photo?.url} alt={post?.title} />
      )}

      <div className="postInfo">
        <div className="postCats">
          {post.categories.map((c) => (
            <span className="postCat">{c?.name}</span>
          ))}
        </div>
        <Link to={`/post/${post._id}`} className="removelink">
          <span className="postTitle">{post.title}</span>
        </Link>

        <hr />
        <span className="postDate">
          {new Date(post.createdAt).toDateString()}
        </span>
      </div>
      <p className="postDesc">{post?.desc}</p>
    </div>
  );
}

export default Post;
