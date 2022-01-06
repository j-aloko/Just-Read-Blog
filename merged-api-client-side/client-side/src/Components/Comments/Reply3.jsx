import React, { useState, useEffect, useContext } from "react";
import Reply4 from "./Reply4";
import { useHistory } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import { userContext } from "./../../Context/UserContext/UserContext";
import axiosInstance from "./../../axios";

function Reply3({ r3, post, setNumOfComments, numOfComments }) {
  const [replyReply3, setReplyReply3] = useState(false);
  const [viewReplies, setViewReplies] = useState(false);
  const [user4, setUser4] = useState({});
  const [reply4, setReply4] = useState([]);
  const [text, setText] = useState("");
  const { user } = useContext(userContext);
  const [posting, setPosting] = useState(false);
  const history = useHistory();

  const handleReplyReply3 = () => {
    setReplyReply3(true);
  };

  //fetch User who made reply 3
  useEffect(() => {
    const getSpecificUser = async () => {
      try {
        const res = await axiosInstance.get("users/" + r3?.userId);
        setUser4(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getSpecificUser();
  }, [r3?.userId]);

  //fetch all Reply 4
  useEffect(() => {
    const GetReply = async () => {
      try {
        const res = await axiosInstance.get("reply4/" + r3?._id);
        setReply4(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    GetReply();
  }, [r3?._id]);

  //Post a reply4
  const PostReply4 = async (e) => {
    e.preventDefault();
    if (user) {
      setPosting(true);
      const details = {
        reply3Id: r3?._id,
        userId: user?._id,
        text,
      };
      try {
        const res = await axiosInstance.post("reply4", details);
        setReply4([...reply4, res.data]);
        setNumOfComments(numOfComments + 1);
        setText("");
        setPosting(false);

        //updating reply4 array in reply3 schema
        await axiosInstance.put("reply4/reply4/" + r3?._id, {
          reply4Id: res.data._id,
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
      <div className="replies3">
        <div className="replyUsernameAndDateWrapper">
          <div className="replyUsernameAndDate">
            <h3 className="replyCommentUsername">{user4?.username}</h3>
            <span className="replyCommentDate">
              {new Date(r3?.createdAt).toDateString()}
            </span>
          </div>
        </div>
        <div className="actualReply">
          <span className="replyDescription">{r3?.text}</span>
          <span className="replyReply" onClick={handleReplyReply3}>
            reply
          </span>
          {replyReply3 && (
            <div className="textReplyWrapper">
              <h4 className="replyToUsername">
                Reply to {user4?.username}{" "}
                <span
                  onClick={() => setReplyReply3(false)}
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
                  onChange={(e) => setText(e.target.value)}
                  value={text}
                ></textarea>
                <button className="submitReply" onClick={PostReply4}>
                  {posting ? <CircularProgress color="success" /> : " Post"}
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
      {viewReplies ? (
        <>
          {reply4?.map((r4) => (
            <Reply4
              r4={r4}
              key={r4._id}
              post={post}
              setNumOfComments={setNumOfComments}
              numOfComments={numOfComments}
            />
          ))}
        </>
      ) : (
        <span className="viewReplies3" onClick={() => setViewReplies(true)}>
          {reply4?.length === 0 ? null : (
            <b>{reply4?.length === 1 ? "View 1 reply" : "View all replies"}</b>
          )}
        </span>
      )}
    </>
  );
}

export default Reply3;
