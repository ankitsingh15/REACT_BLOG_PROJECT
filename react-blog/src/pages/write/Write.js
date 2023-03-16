import React, { useContext } from "react";
import { useState } from "react";
import { Context } from "../../context/Context";
import { axiosClient } from "../../utils/axiosClient";
import "./Write.scss";

function Write() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [categories, setCategories] = useState([]);
  const { user } = useContext(Context);
  // const [file, setFile] = useState("");
  const [postImg, setUserImg] = useState("");
  async function handleSubmit(e) {
    e.preventDefault();
    const response = await axiosClient.post("/post", {
      username: user.username,
      title,
      desc,
      postImg,
      categories,
    });
    console.log("Write Response is", response);
    window.location.replace("/post/" + response.data.result._id);
  }

  function handleImageChange(e) {
    const file = e.target.files[0];
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      if (fileReader.readyState === fileReader.DONE) {
        setUserImg(fileReader.result);
        // console.log("img data", fileReader.result);
      }
    };
  }
  function selectQueryHandle() {
    var options = document.getElementById("select-type").selectedOptions;
    var values = Array.from(options).map(({ value }) => value);
    console.log(values);
    setCategories(values);
  }

  return (
    <div className="write">
      {postImg ? <img className="writeImg" src={postImg} alt="" /> : <></>}

      <form className="writeForm" onSubmit={handleSubmit}>
        <div className="writeFormGroup">
          <label htmlFor="fileInput">
            <i className="writeIcon fas fa-plus"></i>
          </label>
          <input
            id="fileInput"
            type="file"
            style={{ display: "none" }}
            onChange={handleImageChange}
          />
          <input
            className="writeInput"
            placeholder="Title"
            type="text"
            autoFocus={true}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
        </div>
        <div className="selectcat">
          <h2>Select Multiple Categories..Press ctl to select Many</h2>
          <select
            id="select-type"
            multiple="multiple"
            onChange={selectQueryHandle}
          >
            <option value="Life">Life</option>
            <option value="Music">Music</option>
            <option value="Sport">Sport</option>
            <option value="Style">Style</option>
            <option value="Tech">Tech</option>
            <option value="Cinema">Cinema</option>
          </select>
        </div>

        <div className="writeFormGroup">
          <textarea
            className="writeInput writeText"
            placeholder="Tell your story..."
            type="text"
            autoFocus={true}
            onChange={(e) => {
              setDesc(e.target.value);
            }}
          />
        </div>
        <button className="writeSubmit" type="submit">
          Publish
        </button>
      </form>
    </div>
  );
}

export default Write;
