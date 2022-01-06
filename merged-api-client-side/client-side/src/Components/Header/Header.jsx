import React from "react";
import "./Header.css";

function Header() {
  return (
    <div className="header">
      <div className="headerTitle">
        <span className="headerTitleSmall">JUST READ</span>
        <h1 className="headerTitleBold">BLOG</h1>
      </div>
      <img
        src={process.env.PUBLIC_URL + "/toa-heftiba-C9WnRj-CZEk-unsplash.jpg"}
        alt=""
        className="headerImg"
      />
    </div>
  );
}

export default Header;
