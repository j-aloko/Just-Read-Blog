import React from "react";
import "./RelatedPost.css";
import { useHistory } from "react-router-dom";

function RelatedPost({ relatedPost, postId }) {
  const history = useHistory();

  const handleRoute = () => {
    history.push(`/post/${relatedPost?._id}`);
    window.scrollTo({
      top: 0,
      left: 100,
      behavior: "smooth",
    });
  };

  return (
    <>
      {postId !== relatedPost?._id && (
        <div className="relatedPostContainer">
          <div className="Relatedpost" onClick={handleRoute}>
            {relatedPost?.photo ? (
              <img
                src={relatedPost?.photo}
                alt=""
                className="relatedPostImage"
              />
            ) : null}
            <span className="RelatedPostCategory">
              {relatedPost?.categories}
            </span>
            <h3 className="RelatedPostTitle">{relatedPost?.title}</h3>
            <span className="RelatedPostTimePosted">
              {new Date(relatedPost?.createdAt).toDateString()}
            </span>
          </div>
        </div>
      )}
    </>
  );
}

export default RelatedPost;
