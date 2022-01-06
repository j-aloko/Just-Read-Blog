import React, { useState, useEffect, useContext } from "react";
import Reply3 from "./Reply3";
import { useHistory } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import { userContext } from "./../../Context/UserContext/UserContext";
import axiosInstance from "./../../axios";

function Reply2({ r2, post, setNumOfComments, numOfComments }) {
  const [replyReply2, setReplyReply2] = useState(false);
  const [viewReplies, setViewReplies] = useState(false);
  const [user3, setUser3] = useState({});
  const [reply3, setReply3] = useState([]);
  const [text, setText] = useState("");
  const { user } = useContext(userContext);
  const [posting, setPosting] = useState(false);
  const history = useHistory();

  const handleReplyReply2 = () => {
    setReplyReply2(true);
  };

  //fetch User who made reply 2
  useEffect(() => {
    const getSpecificUser = async () => {
      try {
        const res = await axiosInstance.get("users/" + r2?.userId);
        setUser3(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getSpecificUser();
  }, [r2?.userId]);

  //fetch all Reply 3
  useEffect(() => {
    const GetReply = async () => {
      try {
        const res = await axiosInstance.get("reply3/" + r2?._id);
        setReply3(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    GetReply();
  }, [r2?._id]);

  //Post a reply3
  const PostReply3 = async (e) => {
    e.preventDefault();
    if (user) {
      setPosting(true);
      const details = {
        reply2Id: r2?._id,
        userId: user?._id,
        text,
      };
      try {
        const res = await axiosInstance.post("reply3", details);
        setReply3([...reply3, res.data]);
        setNumOfComments(numOfComments + 1);
        setText("");
        setPosting(false);

        //updating reply3 array in reply2 schema
        await axiosInstance.put("reply3/reply3/" + r2?._id, {
          reply3Id: res.data._id,
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
    <>
      <div className="replies2">
        <div className="replyUsernameAndDateWrapper">
          <div className="replyUsernameAndDate">
            <h3 className="replyCommentUsername">{user3?.username}</h3>
            <span className="replyCommentDate">
              {new Date(r2?.createdAt).toDateString()}
            </span>
          </div>
        </div>
        <div className="actualReply">
          <span className="replyDescription">{r2?.text}</span>
          <span className="replyReply" onClick={handleReplyReply2}>
            reply
          </span>
          {replyReply2 && (
            <div className="textReplyWrapper">
              <h4 className="replyToUsername">
                Reply to {user3?.username}{" "}
                <span
                  onClick={() => setReplyReply2(false)}
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
                <button className="submitReply" onClick={PostReply3}>
                  {posting ? <CircularProgress color="success" /> : "Post"}
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
      {viewReplies ? (
        <>
          {reply3.map((r3) => (
            <Reply3
              r3={r3}
              key={r3?._id}
              post={post}
              setNumOfComments={setNumOfComments}
              numOfComments={numOfComments}
            />
          ))}
        </>
      ) : (
        <span className="viewReplies2" onClick={() => setViewReplies(true)}>
          {reply3?.length === 0 ? null : (
            <b>{reply3?.length === 1 ? "View 1 reply" : "View all replies"}</b>
          )}
        </span>
      )}
    </>
  );
}

export default Reply2;
