import React from "react";
import { Link } from "react-router-dom";
import "./Author.css";

function Author({ post }) {
  return (
    <div className="authorContainer">
      <Link to={`/post/${post._id}`} className="links">
        <div className="Authorpost">
          {post?.photo ? (
            <img src={post?.photo} alt="" className="AuthorpostImage" />
          ) : null}
          <span className="AuthorpostCategory">{post?.categories}</span>
          <h3 className="AuthorpostTitle">{post?.title}</h3>
          <span className="AuthorPostTimePosted">
            {new Date(post?.createdAt).toDateString()}
          </span>
        </div>
      </Link>
    </div>
  );
}

export default Author;
