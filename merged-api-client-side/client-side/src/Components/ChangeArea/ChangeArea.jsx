import React, { useContext, useState } from "react";
import "./ChangeArea.css";
import { userContext } from "./../../Context/UserContext/UserContext";
import { UpdateUser } from "./../../Context/ApiCalls/UserApiCalls";
import CircularProgress from "@mui/material/CircularProgress";
import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";
import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";

function ChangeArea({ selected }) {
  const { user, dispatch, error } = useContext(userContext);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [facebook, setFacebook] = useState("");
  const [instagram, setInstagram] = useState("");
  const [twitter, setTwitter] = useState("");
  const [pinterest, setPinterest] = useState("");
  const [about, setAbout] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingx, setLoadingx] = useState(false);
  const [loadingA, setLoadingA] = useState(false);
  const [success, setSuccess] = useState(false);

  //Updating user Info
  const updateBasicDetails = (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const info = {
        username,
        email,
        password,
      };
      const id = user?._id;

      UpdateUser(id, dispatch, info);
      setLoading(false);
      setSuccess(true);
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      console.log(error);
    }
  };

  const updateSocialProfiles = (e) => {
    e.preventDefault();
    setLoadingx(true);
    try {
      const info = {
        facebook,
        instagram,
        twitter,
        pinterest,
      };
      const id = user?._id;

      UpdateUser(id, dispatch, info);
      setLoading(false);
      setSuccess(true);
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      console.log(error);
    }
  };

  const updateAbout = (e) => {
    setLoadingA(true);
    e.preventDefault();
    try {
      const info = {
        about,
      };
      const id = user?._id;
      UpdateUser(id, dispatch, info);
      setLoading(false);
      setSuccess(true);
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      console.log(error);
    }
  };

  if (selected === "Basic Details") {
    return (
      <div className="changeArea">
        <div className="basicDetailsWrapper">
          <h1 className="profileTitle">Basic Details</h1>
          <form className="basicDetailsForm">
            <div className="formItem">
              <input
                type="text"
                className="inputItem"
                placeholder="Username"
                autoFocus={true}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="formItem">
              <input
                type="email"
                className="inputItem"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="formItem">
              <input
                type="password"
                className="inputItem"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </form>
          <div className="buttonWraper">
            <button className="update" onClick={updateBasicDetails}>
              {loading ? <CircularProgress color="success" /> : "Update"}
            </button>
          </div>
          {success && (
            <div className="successFeedBack">
              <CheckCircleOutlinedIcon />
              <span className="message">Updated Successfully</span>
            </div>
          )}
          {error && (
            <div className="errorFeedBack">
              <ErrorOutlineOutlinedIcon />
              <span className="message">Error! Something went wrong</span>
            </div>
          )}
        </div>
      </div>
    );
  } else if (selected === "Social Profiles") {
    return (
      <div className="changeArea">
        <div className="basicDetailsWrapper">
          <h1 className="profileTitle">Social Profiles</h1>
          <form className="basicDetailsForm">
            <div className="formItem">
              <input
                type="text"
                className="inputItem"
                autoFocus={true}
                placeholder="Facebook Link"
                onChange={(e) => setFacebook(e.target.value)}
              />
            </div>
            <div className="formItem">
              <input
                type="text"
                className="inputItem"
                placeholder="Instagram Link"
                onChange={(e) => setInstagram(e.target.value)}
              />
            </div>
            <div className="formItem">
              <input
                type="text"
                className="inputItem"
                placeholder="Twitter Link"
                onChange={(e) => setTwitter(e.target.value)}
              />
            </div>
            <div className="formItem">
              <input
                type="text"
                className="inputItem"
                placeholder="Pinterest Link"
                onChange={(e) => setPinterest(e.target.value)}
              />
            </div>
          </form>
          <div className="buttonWraper">
            <button className="update" onClick={updateSocialProfiles}>
              {loadingx ? <CircularProgress color="success" /> : "Update"}
            </button>
          </div>
          {success && (
            <div className="successFeedBack">
              <CheckCircleOutlinedIcon />
              <span className="message">Updated Successfully</span>
            </div>
          )}
          {error && (
            <div className="errorFeedBack">
              <ErrorOutlineOutlinedIcon />
              <span className="message">Error! Something went wrong</span>
            </div>
          )}
        </div>
      </div>
    );
  } else {
    return (
      <div className="changeArea">
        <div className="basicDetailsWrapper">
          <h1 className="profileTitle">About</h1>
          <textarea
            className="about"
            placeholder="describe yourself in the third person......(max length 350 words) e.g. john draws his inspiration from ..."
            maxLength={350}
            autoFocus={true}
            onChange={(e) => setAbout(e.target.value)}
          ></textarea>
          <div className="buttonWraper">
            <button className="update" onClick={updateAbout}>
              {loadingA ? <CircularProgress color="success" /> : "Update"}
            </button>
          </div>
          {success && (
            <div className="successFeedBack">
              <CheckCircleOutlinedIcon />
              <span className="message">Updated Successfully</span>
            </div>
          )}
          {error && (
            <div className="errorFeedBack">
              <ErrorOutlineOutlinedIcon />
              <span className="message">Error! Something went wrong</span>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default ChangeArea;
