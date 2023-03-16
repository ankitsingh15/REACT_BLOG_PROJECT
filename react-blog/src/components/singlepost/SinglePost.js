import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Context } from "../../context/Context";
import { axiosClient } from "../../utils/axiosClient";
import "./SinglePost.scss";
function SinglePost() {
  const { user } = useContext(Context);
  const [title, setTitle] = useState();
  const [desc, setDesc] = useState();
  const [update, setUpdate] = useState();
  const [updateMode, setUpdateMode] = useState(false);

  const params = useParams("");
  const [post, setPostById] = useState();
  useEffect(() => {
    const fetchData = async () => {
      const result = await axiosClient.get(`/post/${params.postId}`);
      setPostById(result.data.result.post);
      console.log("post is ", result);
      setTitle(result.data.result.post.title);
      setDesc(result.data.result.post.desc);
    };

    fetchData();
  }, [params.postId]);

  async function handleDelete() {
    try {
      console.log("in handle Delete", user.username);
      const res = await axiosClient.delete("/post/" + post._id, {
        data: {
          username: user.username,
        },
      });
      // console.log("delete result is ", res);
      window.location.replace("/");
    } catch (err) {
      console.log(err);
    }
  }
  async function handleUpdate() {
    const res = await axiosClient.put(`/post/${post._id}`, {
      username: post.username,
      title,
      desc,
    });
    // console.log("updated post is", res);
    setUpdateMode(false);
  }

  async function cancelUpdate() {
    window.location.replace(`/post/${post._id}`);
  }

  return (
    <div className="singlepost">
      <div className="singlepostwrapper">
        <div className="singlepostimage">
          <img
            src={
              post?.photo?.url
                ? post?.photo?.url
                : "https://images.pexels.com/photos/6685428/pexels-photo-6685428.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
            }
            alt=""
          />
        </div>
        {updateMode ? (
          <input
            type="text"
            value={title}
            className="singlepostparaInput"
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
        ) : (
          <span>
            <p className="singlepostpara">
              {title}
              {post?.username === user?.username && (
                <span className="singleposticons">
                  <i
                    className="singlepostupdate fa-solid fa-pen-to-square"
                    onClick={() => {
                      setUpdateMode(true);
                    }}
                  ></i>

                  <i
                    className="singlepostdelete fa-solid fa-trash-can"
                    onClick={handleDelete}
                  ></i>
                </span>
              )}
            </p>
          </span>
        )}

        <div className="singlepostdetails">
          <p className="singlepostAuthor">
            Author :
            <Link to={`/?user=${post?.username}`} className="removelink">
              {post?.username}
            </Link>
          </p>
          <p className="singlepostupdate">
            {new Date(post?.createdAt).toDateString()}
          </p>
        </div>
        {updateMode ? (
          <textarea
            className="singlePostDescInput"
            value={desc}
            onChange={(e) => {
              setDesc(e.target.value);
            }}
          ></textarea>
        ) : (
          <p className="singlePostDesc">{desc}</p>
        )}
        {updateMode && (
          <button className="updateButton" onClick={handleUpdate}>
            Update
          </button>
        )}
        {updateMode && (
          <button className="cancelUpdate" onClick={cancelUpdate}>
            Cancel
          </button>
        )}
      </div>
    </div>
  );
}

export default SinglePost;
