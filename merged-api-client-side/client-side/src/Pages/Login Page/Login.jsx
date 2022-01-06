import React, { useContext, useState } from "react";
import "./Login.css";
import { Link, useHistory } from "react-router-dom";
import { userLogin } from "./../../Context/ApiCalls/UserApiCalls";
import { userContext } from "./../../Context/UserContext/UserContext";

function Login() {
  const [user, setUser] = useState(null);
  const history = useHistory();

  const handleChange = (e) => {
    const value = e.target.value;
    setUser({ ...user, [e.target.name]: value });
  };

  const { isFetching, dispatch, isError, success } = useContext(userContext);

  const handleLogin = (e) => {
    e.preventDefault();
    const mailformat =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (!user.email) {
      alert("Email field is required");
    } else if (!user.password) {
      alert("Password field is required");
    } else if (!user.email.match(mailformat)) {
      alert("Invalid email address");
    } else {
      userLogin(user, dispatch);
      if (success) {
        history.push("/");
      }
    }
  };

  return (
    <div className="login">
      <div className="loginWrapper">
        <Link to="/register" className="links">
          <button className="register">Register</button>
        </Link>
        <span className="loginTitle">Login</span>
        <form className="loginForm">
          <div className="inputItemx">
            <label className="InputLabel">Email</label>
            <input
              type="email"
              placeholder="example@gmail.com"
              name="email"
              onChange={handleChange}
              required
            />
          </div>
          <div className="inputItemx">
            <label className="InputLabel">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
              required
            />
          </div>
        </form>
        <button
          className="loginButton"
          onClick={handleLogin}
          disabled={isFetching}
        >
          Login
        </button>
        {isError && (
          <span
            className="registrationError"
            style={{
              marginTop: "20px",
              padding: "10px",
              backgroundColor: "red",
              fontSize: "20px",
              borderRadius: "5px",
              color: "white",
            }}
          >
            Wrong Email or Password
          </span>
        )}
      </div>
    </div>
  );
}

export default Login;
