import React, { useState } from "react";
import "./Register.css";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import axiosInstance from "./../../axios";

function Register() {
  const [userInfo, setUserInfo] = useState(null);
  const [error, setError] = useState(false);

  const history = useHistory();

  const handleChange = (e) => {
    const value = e.target.value;
    setUserInfo({ ...userInfo, [e.target.name]: value });
  };

  const handleClick = async (e) => {
    e.preventDefault();
    const mailformat =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (!userInfo.email) {
      alert("Email field is required");
    } else if (!userInfo.password) {
      alert("Password field is required");
    } else if (!userInfo.email.match(mailformat)) {
      alert("Invalid email address");
    } else if (!userInfo.username) {
      alert("Username field is required");
    } else {
      try {
        await axiosInstance.post("register", userInfo);
        history.push("/login");
      } catch (error) {
        setError(error);
      }
    }
  };

  return (
    <div className="registerr">
      <div className="registerWrapper">
        <Link to="/login" className="links">
          <button className="registerlogin">Login</button>
        </Link>
        <span className="registerTitle">Register</span>
        <form className="registerForm">
          <div className="reistrationItem">
            <label>Username</label>
            <input
              type="text"
              placeholder="Joey_Tsino"
              name="username"
              onChange={handleChange}
            />
          </div>
          <div className="reistrationItem">
            <label>Email</label>
            <input
              type="email"
              placeholder="example@gmail.com"
              name="email"
              onChange={handleChange}
            />
          </div>
          <div className="reistrationItem">
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
            />
          </div>
        </form>
        <button className="registerButton" onClick={handleClick}>
          register
        </button>
        {error && (
          <span
            className="registrationError"
            style={{
              marginTop: "20px",
              fontSize: "20px",
              fontWeight: "bold",
              color: "red",
            }}
          >
            Something went wrong!!
          </span>
        )}
      </div>
    </div>
  );
}

export default Register;
