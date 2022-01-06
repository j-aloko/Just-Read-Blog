import React, { useState, useEffect } from "react";
import "./AuthorsPost.css";
import { useLocation } from "react-router";
import Author from "./../../Components/Author/Author";
import ContentLoader from "react-content-loader";
import axiosInstance from "./../../axios";

function AuthorsPost() {
  const [posts, setPosts] = useState([]);
  const location = useLocation();
  const name = location.pathname.split("/")[2];

  //fetchPost by username
  useEffect(() => {
    const FetchPosts = async () => {
      try {
        const res = await axiosInstance.get(`posts?user=${name}`);
        setPosts(
          res.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        );
      } catch (error) {
        console.log(error);
      }
    };
    FetchPosts();
  }, [name]);

  //Skeleton

  const AuthorPostsLoader = () => (
    <ContentLoader
      width={375}
      height={320}
      backgroundColor={"#808080"}
      foregroundColor={"#999"}
    >
      <rect x="0" y="30" rx="5" ry="5" width="375" height="320" />
    </ContentLoader>
  );

  const MyPostTitleLoader = () => (
    <ContentLoader
      width={375}
      height={40}
      backgroundColor={"#808080"}
      foregroundColor={"#999"}
    >
      <rect x="0" y="15" rx="0" ry="0" width="375" height="40" />
    </ContentLoader>
  );

  return (
    <div className="authorsPost">
      <div className="authorPostWrapper">
        <h3 className="nameTitle">ALL POSTS BY {name.toLocaleUpperCase()}</h3>
        <div className="allAuthorsPosts">
          {posts?.length > 0 ? (
            <>
              {posts?.map((post) => (
                <Author post={post} key={post._id} />
              ))}
            </>
          ) : (
            <div className="AuthorSkeleton">
              <div className="authorPostsss">
                <AuthorPostsLoader />
                <MyPostTitleLoader />
              </div>
              <div className="authorPostsss">
                <AuthorPostsLoader />
                <MyPostTitleLoader />
              </div>
              <div className="authorPostsss">
                <AuthorPostsLoader />
                <MyPostTitleLoader />
              </div>
              <div className="authorPostsss">
                <AuthorPostsLoader />
                <MyPostTitleLoader />
              </div>
              <div className="authorPostsss">
                <AuthorPostsLoader />
                <MyPostTitleLoader />
              </div>
              <div className="authorPostsss">
                <AuthorPostsLoader />
                <MyPostTitleLoader />
              </div>
              <div className="authorPostsss">
                <AuthorPostsLoader />
                <MyPostTitleLoader />
              </div>
              <div className="authorPostsss">
                <AuthorPostsLoader />
                <MyPostTitleLoader />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AuthorsPost;
