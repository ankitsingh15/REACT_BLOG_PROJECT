import React, { useContext, useState } from "react";
import SideBar from "../../components/sidebar/SideBar";
import { Context } from "../../context/Context";
import { axiosClient } from "../../utils/axiosClient";
import "./Setting.scss";

function Settings() {
  const { user, dispatch } = useContext(Context);
  console.log("User is ", user);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [postImg, setpostImg] = useState(user?.ProfilePic?.url);

  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    dispatch({ type: "UPDATE_START" });
    try {
      const result = await axiosClient.put(`/user/${user._id}`, {
        userId: user._id,
        postImg,
        username,
        password,
      });
      setSuccess(true);
      // console.log("User update result is", result);
      dispatch({
        type: "UPDATE_SUCCESS",
        payload: result?.data?.result?.updatedUser,
      });
      //   if (response.data?.result?.others) {
      //     dispatch({
      //       type: "LOGIN_SUCCESS",
      //       payload: response.data?.result?.others,
      //     });
      //     window.location.replace("/");
      //   } else {
      //     dispatch({ type: "LOGIN_FAILURE" });
      //   }
    } catch (err) {
      console.log(err);
      dispatch({ type: "UPDATE_FAILURE" });
    }
  }

  function handleImageChange(e) {
    const file = e.target.files[0];
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      if (fileReader.readyState === fileReader.DONE) {
        setpostImg(fileReader.result);
        // console.log("img data", fileReader.result);
      }
    };
  }

  return (
    <div className="settings">
      <div className="settingsWrapper">
        <div className="settingsTitle">
          <span className="settingsTitleUpdate">Update Your Account</span>
          <span className="settingsTitleDelete">Delete Account</span>
        </div>
        <form className="settingsForm" onSubmit={handleSubmit}>
          <label>Profile Picture</label>
          <div className="settingsPP">
            <img
              src={
                postImg
                  ? postImg
                  : "https://images.pexels.com/photos/6685428/pexels-photo-6685428.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
              }
              alt=""
            />
            <label htmlFor="fileInput">
              <i className="settingsPPIcon far fa-user-circle"></i>
            </label>
            <input
              id="fileInput"
              type="file"
              style={{ display: "none" }}
              className="settingsPPInput"
              onChange={handleImageChange}
            />
          </div>
          <label>Username</label>
          <input
            type="text"
            placeholder={user.username}
            name="name"
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
          <label>Email</label>
          <input
            type="email"
            placeholder={user.email}
            name="email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <label>Password</label>
          <input
            type="password"
            placeholder={""}
            name="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <button className="settingsSubmitButton" type="submit">
            Update
          </button>
          {success && (
            <span
              style={{ color: "green", marginTop: "10px", textAlign: "center" }}
            >
              Profile has been Updated...
            </span>
          )}
        </form>
      </div>
      <SideBar />
    </div>
  );
}

export default Settings;
