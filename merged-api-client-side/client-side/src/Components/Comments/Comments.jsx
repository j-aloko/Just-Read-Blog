import React, { useState, useEffect, useContext } from "react";
import "./Comments.css";
import Reply1 from "./Reply1";
import { userContext } from "./../../Context/UserContext/UserContext";
import { useHistory } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import axiosInstance from "./../../axios";

function Comments({ comment, post, setNumOfComments, numOfComments }) {
  const [replyComment, setReplyComment] = useState(false);
  const [viewReplies, setViewReplies] = useState(false);
  const [user1, setUser1] = useState({});
  const [reply1, setReply1] = useState([]);
  const [text, setText] = useState("");
  const [posting, setPosting] = useState(false);
  const history = useHistory();
  const { user } = useContext(userContext);

  const handleReplyComment = () => {
    setReplyComment(true);
  };

  //fetching User who made the comment
  useEffect(() => {
    const getSpecificUser = async () => {
      try {
        const res = await axiosInstance.get("users/" + comment?.userId);
        setUser1(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getSpecificUser();
  }, [comment?.userId]);

  //fetch all Reply 1
  useEffect(() => {
    const GetReply = async () => {
      try {
        const res = await axiosInstance.get("reply1/" + comment?._id);
        setReply1(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    GetReply();
  }, [comment?._id]);

  //Post a reply1
  const PostReply1 = async (e) => {
    e.preventDefault();
    if (user) {
      setPosting(true);
      const details = {
        commentId: comment?._id,
        userId: user?._id,
        text,
      };
      try {
        const res = await axiosInstance.post("reply1", details);
        setReply1((prev) => [...prev, res.data]);
        setNumOfComments(numOfComments + 1);
        setText("");
        setPosting(false);

        //updating reply1 array in comment schema
        await axiosInstance.put("reply1/reply1/" + comment?._id, {
          reply1Id: res.data._id,
        });

        //updating comments array in post Schema
        await axiosInstance.put("comments/comment/" + post?._id, {
          commentId: res.data._id,
        });
      } catch (error) {
        console.log(error);
      }
    } else {
      history.push("/login");
    }
  };

  return (
    <div className="commentsContainer">
      <div className="CommentWrapper">
        <ul className="commentItems">
          <li className="commentListItems">
            <div className="usernameAndDateWrapper">
              <div className="usernameAndDate">
                <h3 className="commentUsername">{user1?.username}</h3>
                <span className="commentDate">
                  {new Date(comment?.createdAt).toDateString()}
                </span>
              </div>
            </div>
            <div className="actualComment">
              <span className="commentDescription">{comment?.text}</span>
              <span className="replyComment" onClick={handleReplyComment}>
                reply
              </span>
              {replyComment && (
                <div className="textReplyWrapper">
                  <h4 className="replyToUsername">
                    Reply to {user1?.username}{" "}
                    <span
                      onClick={() => setReplyComment(false)}
                      style={{
                        color: "red",
                        fontWeight: 500,
                        cursor: "pointer",
                      }}
                    >
                      Cancel Reply
                    </span>
                  </h4>
                  <form className="ReplyForm">
                    <textarea
                      className="typeReply"
                      placeholder="Write a reply"
                      value={text}
                      onChange={(e) => setText(e.target.value)}
                    ></textarea>
                    <button className="submitReply" onClick={PostReply1}>
                      {posting ? <CircularProgress color="success" /> : "Post"}
                    </button>
                  </form>
                </div>
              )}
            </div>
            {viewReplies ? (
              <>
                {reply1?.map((r1) => (
                  <Reply1
                    r1={r1}
                    key={r1._id}
                    post={post}
                    setNumOfComments={setNumOfComments}
                    numOfComments={numOfComments}
                  />
                ))}
              </>
            ) : (
              <span
                className="viewReplies"
                onClick={() => setViewReplies(true)}
              >
                {reply1?.length === 0 ? null : (
                  <b>
                    {reply1?.length === 1 ? "View 1 reply" : "View all replies"}
                  </b>
                )}
              </span>
            )}
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Comments;
