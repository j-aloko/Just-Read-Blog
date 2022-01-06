import React, { useContext, useState, useEffect } from "react";
import "./Write.css";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import { Editor } from "@tinymce/tinymce-react";
import { userContext } from "./../../Context/UserContext/UserContext";
//import { storage } from "./../../Firebase/Firebase";
import { postsContext } from "./../../Context/PostContext/postContext";
import { useHistory } from "react-router-dom";
import {
  createPostStart,
  createPostSuccess,
  createPostFailure,
} from "./../../Context/PostContext/postActions";
import CircularProgress from "@mui/material/CircularProgress";
import axiosInstance from "./../../axios";

function Write() {
  const { user } = useContext(userContext);

  const history = useHistory();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [photo, setPhoto] = useState("");
  const [categories, setCategories] = useState([]);
  const [file, setFile] = useState(null);
  const [publishing, setPublishing] = useState(false);
  // const [uploading, setUploading] = useState(false);
  //const [progress, setProgress] = useState(0);

  //Firebase file-upload

  /*const handleUpload = (e) => {
    e.preventDefault();
    setUploading(true);
    const uploadTask = storage.ref(`blogImages/${file.name}`).put(file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const status = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(status);
      },
      (error) => {
        console.log(error);
      },
      () => {
        storage
          .ref("blogImages")
          .child(file.name)
          .getDownloadURL()
          .then((url) => {
            setPhoto(url);
          });
      }
    );
  };*/

  //Handle server file upload upon choosing image
  useEffect(() => {
    if (file) {
      const uploadImage = async () => {
        const data = new FormData();
        data.append("file", file);
        try {
          const res = await axiosInstance.post("upload", data, {
            headers: { "Content-Type": "multipart/form-data" },
          });
          setPhoto(res.data.filePath);
        } catch (error) {
          console.log(error);
        }
      };
      uploadImage();
    }
  }, [file]);

  console.log(photo);

  const { dispatch } = useContext(postsContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setPublishing(true);
    const newPost = {
      username: user.username,
      title,
      description,
      photo,
      categories,
    };
    dispatch(createPostStart());
    try {
      const res = await axiosInstance.post("posts", newPost);
      dispatch(createPostSuccess(res.data));

      history.push(`/post/${res.data._id}`);
    } catch (error) {
      dispatch(createPostFailure());
    }
  };

  return (
    <div className="write">
      {file && (
        <img
          src={URL.createObjectURL(file)}
          alt=""
          className="writeBackgroundImg"
        />
      )}
      <form className="writeForm" encType="multipart/form-data">
        <div className="uploadTitleAndButton">
          <label htmlFor="file">
            <FileUploadOutlinedIcon
              className="uploadIconx"
              style={{ fontSize: 35 }}
            />
          </label>
          <input
            type="file"
            id="file"
            style={{ display: "none" }}
            onChange={(e) => setFile(e.target.files[0])}
          />
          <button
            className="publish"
            disabled={publishing}
            onClick={handleSubmit}
          >
            {publishing ? <CircularProgress color="success" /> : "Publish"}
          </button>
        </div>
        <input
          type="text"
          placeholder="Category/Categories"
          className="cat"
          autoFocus={true}
          onChange={(e) => setCategories(e.target.value)}
        />
        <textarea
          className="writeTitle"
          type="text"
          id="title"
          placeholder="Title"
          onChange={(e) => setTitle(e.target.value)}
        ></textarea>
        <Editor
          initialValue="<p></p>"
          placeholder="Type your contents here"
          apiKey="f9s9b5qra1it13jwl384beb6s3roxt0s6qj3j6k9pmv45ssx"
          init={{
            height: 700,
            width: "100%",
            menubar: true,
            plugins: [
              "advlist autolink lists link image",
              "charmap print preview anchor help",
              "searchreplace visualblocks code",
              "insertdatetime media table paste wordcount",
            ],
            fontsize_formats:
              "8pt 9pt 10pt 11pt 12pt 14pt 18pt 24pt 30pt 36pt 48pt 60pt 72pt 96pt",

            content_style:
              "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
          }}
          onChange={(e) => setDescription(e.target.getContent())}
        />
      </form>
    </div>
  );
}

export default Write;
