import React from "react";
import "./Posts.css";
import Post from "./../Post/Post";
import { MyPostImageLoader, MyPostTitleLoader } from "./../../SkeletonLoader";

function Posts({ posts }) {
  return (
    <div className="posts">
      {posts.length > 0 ? (
        <>
          {posts?.map((p) => (
            <Post key={p?._id} post={p} />
          ))}
        </>
      ) : (
        <div className="skeletons">
          <div className="skeletonItems">
            <MyPostImageLoader />
            <div className="skeletonTitle">
              <MyPostTitleLoader />
            </div>
          </div>
          <div className="skeletonItems">
            <MyPostImageLoader />
            <div className="skeletonTitle">
              <MyPostTitleLoader />
            </div>
          </div>
          <div className="skeletonItems">
            <MyPostImageLoader />
            <div className="skeletonTitle">
              <MyPostTitleLoader />
            </div>
          </div>
          <div className="skeletonItems">
            <MyPostImageLoader />
            <div className="skeletonTitle">
              <MyPostTitleLoader />
            </div>
          </div>
          <div className="skeletonItems">
            <MyPostImageLoader />
            <div className="skeletonTitle">
              <MyPostTitleLoader />
            </div>
          </div>
          <div className="skeletonItems">
            <MyPostImageLoader />
            <div className="skeletonTitle">
              <MyPostTitleLoader />
            </div>
          </div>
          <div className="skeletonItems">
            <MyPostImageLoader />
            <div className="skeletonTitle">
              <MyPostTitleLoader />
            </div>
          </div>
          <div className="skeletonItems">
            <MyPostImageLoader />
            <div className="skeletonTitle">
              <MyPostTitleLoader />
            </div>
          </div>
          <div className="skeletonItems">
            <MyPostImageLoader />
            <div className="skeletonTitle">
              <MyPostTitleLoader />
            </div>
          </div>
          <div className="skeletonItems">
            <MyPostImageLoader />
            <div className="skeletonTitle">
              <MyPostTitleLoader />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Posts;
