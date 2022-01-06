import React from "react";
import "./Post.css";
import { Link } from "react-router-dom";

function Post({ post }) {
  return (
    <Link to={`post/${post?._id}`} className="links">
      <div className="post">
        {post?.photo && <img src={post?.photo} alt="" className="postImage" />}
        <span className="postCategory">{post?.categories}</span>
        <h4 className="postTitle">{post?.title}</h4>
        <span className="timePosted">
          {new Date(post?.createdAt).toDateString()}
        </span>
      </div>
    </Link>
  );
}

export default Post;
