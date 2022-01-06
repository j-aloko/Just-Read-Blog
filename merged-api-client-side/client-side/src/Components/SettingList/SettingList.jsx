import React, { useContext, useState, useEffect } from "react";
import Lists from "../Lists/Lists";
import "./SettingList.css";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import { userContext } from "./../../Context/UserContext/UserContext";
import { DeleteUser, UpdateUser } from "./../../Context/ApiCalls/UserApiCalls";
import CircularProgress from "@mui/material/CircularProgress";
import axiosInstance from "./../../axios";

function SettingList({ List, selected, setSelected }) {
  const { user, dispatch } = useContext(userContext);

  const [file, setFile] = useState(null);
  const [profilePic, setProfilePic] = useState("");
  const [deleting, setDeleting] = useState(false);
  const [currentUser, setCurrentUser] = useState({});

  //fetch current user anytime the page renders
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axiosInstance.get("users/" + user?._id);
        setCurrentUser(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUser();
  }, [user?._id]);

  useEffect(() => {
    if (file) {
      const uploadImage = async () => {
        const data = new FormData();
        data.append("file", file);
        try {
          const res = await axiosInstance.post("upload", data, {
            headers: { "Content-Type": "multipart/form-data" },
          });
          setProfilePic(res.data.filePath);
        } catch (error) {
          console.log(error);
        }
      };
      uploadImage();
    }
  }, [file]);

  const updateImage = (e) => {
    e.preventDefault();
    const id = user?._id;
    UpdateUser(id, dispatch, { profilePic });
    window.location.reload();
  };

  const deleteAccount = (e) => {
    e.preventDefault();
    setDeleting(true);
    const id = user?._id;
    DeleteUser(id, dispatch);
    setTimeout(() => {
      window.location.reload();
    }, 2000);
  };

  return (
    <div className="settingList">
      <div className="settingListWrapper">
        <div className="imgAndUsername">
          <div className="imgWrapper">
            <div className="uploadIcon">
              <label htmlFor="file">
                <FileUploadIcon style={{ fontSize: 35 }} />
              </label>
              <input
                type="file"
                id="file"
                style={{ display: "none" }}
                onChange={(e) => setFile(e.target.files[0])}
              />
            </div>
            {file ? (
              <img
                src={URL.createObjectURL(file)}
                alt=""
                className="usersImage"
              />
            ) : (
              <img
                src={
                  currentUser?.profilePic ||
                  "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
                }
                alt=""
                className="usersImage"
              />
            )}

            {file && (
              <button className="updateImageButton" onClick={updateImage}>
                Update
              </button>
            )}
          </div>
          <h3 className="usersname">{user?.username}</h3>
        </div>
        {List.map((item) => (
          <Lists
            item={item}
            key={item.id}
            active={selected === item.id}
            setSelected={setSelected}
          />
        ))}
      </div>
      <div className="deleteButtonWrapper">
        <button className="DeletUser" onClick={deleteAccount}>
          {deleting ? <CircularProgress /> : " Delete Account"}
        </button>
      </div>
    </div>
  );
}

export default SettingList;
