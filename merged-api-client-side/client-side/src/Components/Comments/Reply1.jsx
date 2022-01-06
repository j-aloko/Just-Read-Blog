import React, { useState, useEffect, useContext } from "react";
import Reply2 from "./Reply2";
import { userContext } from "./../../Context/UserContext/UserContext";
import { useHistory } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import axiosInstance from "./../../axios";

function Reply1({ r1, post, setNumOfComments, numOfComments }) {
  const [replyReply1, setReplyReply1] = useState(false);
  const [viewReplies, setViewReplies] = useState(false);
  const [user2, setUser2] = useState({});
  const [reply2, setReply2] = useState([]);
  const [text, setText] = useState("");
  const { user } = useContext(userContext);
  const [posting, setPosting] = useState(false);
  const history = useHistory();

  const handleReplyReply1 = () => {
    setReplyReply1(true);
  };

  //fetch User who made reply 1
  useEffect(() => {
    const getSpecificUser = async () => {
      try {
        const res = await axiosInstance.get("users/" + r1?.userId);
        setUser2(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getSpecificUser();
  }, [r1?.userId]);

  //fetch all Reply 2
  useEffect(() => {
    const GetReply = async () => {
      try {
        const res = await axiosInstance.get("reply2/" + r1?._id);
        setReply2(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    GetReply();
  }, [r1?._id]);

  //Post a reply2
  const PostReply2 = async (e) => {
    e.preventDefault();
    if (user) {
      setPosting(true);
      const details = {
        reply1Id: r1?._id,
        userId: user?._id,
        text,
      };
      try {
        const res = await axiosInstance.post("reply2", details);
        setReply2([...reply2, res.data]);
        setNumOfComments(numOfComments + 1);
        setText("");
        setPosting(false);

        //updating reply2 array in reply1 schema
        await axiosInstance.put("reply2/reply2/" + r1?._id, {
          reply2Id: res.data._id,
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
      <div className="replies">
        <div className="replyUsernameAndDateWrapper">
          <div className="replyUsernameAndDate">
            <h3 className="replyCommentUsername">{user2?.username}</h3>
            <span className="replyCommentDate">
              {new Date(r1?.createdAt).toDateString()}
            </span>
          </div>
        </div>
        <div className="actualReply">
          <span className="replyDescription">{r1?.text}</span>
          <span className="replyReply" onClick={handleReplyReply1}>
            reply
          </span>
          {replyReply1 && (
            <div className="textReplyWrapper">
              <h4 className="replyToUsername">
                Reply to {user2?.username}{" "}
                <span
                  onClick={() => setReplyReply1(false)}
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
                <button className="submitReply" onClick={PostReply2}>
                  {posting ? <CircularProgress color="success" /> : "Post"}
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
      {viewReplies ? (
        <>
          {reply2?.map((r2) => (
            <Reply2
              r2={r2}
              key={r2?._id}
              post={post}
              setNumOfComments={setNumOfComments}
              numOfComments={numOfComments}
            />
          ))}
        </>
      ) : (
        <span className="viewReplies1" onClick={() => setViewReplies(true)}>
          {reply2?.length === 0 ? null : (
            <b>{reply2?.length === 1 ? "View 1 reply" : "View all replies"}</b>
          )}
        </span>
      )}
    </>
  );
}

export default Reply1;
