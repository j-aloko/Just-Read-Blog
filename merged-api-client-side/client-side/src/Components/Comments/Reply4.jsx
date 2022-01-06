import React, { useState, useEffect, useContext } from "react";
import Reply5 from "./Reply5";
import { useHistory } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import { userContext } from "./../../Context/UserContext/UserContext";
import axiosInstance from "./../../axios";

function Reply4({ r4, post, setNumOfComments, numOfComments }) {
  const [replyReply4, setReplyReply4] = useState(false);
  const [viewReplies, setViewReplies] = useState(false);
  const [user5, setUser5] = useState({});
  const [reply5, setReply5] = useState([]);
  const [text, setText] = useState("");
  const { user } = useContext(userContext);
  const [posting, setPosting] = useState(false);
  const history = useHistory();

  const handleReplyReply4 = () => {
    setReplyReply4(true);
  };

  //fetch User who made reply 4
  useEffect(() => {
    const getSpecificUser = async () => {
      try {
        const res = await axiosInstance.get("users/" + r4?.userId);
        setUser5(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getSpecificUser();
  }, [r4?.userId]);

  //fetch all Reply 5
  useEffect(() => {
    const GetReply = async () => {
      try {
        const res = await axiosInstance.get("reply5/" + r4?._id);
        setReply5(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    GetReply();
  }, [r4?._id]);

  //Post a reply5
  const PostReply5 = async (e) => {
    e.preventDefault();
    if (user) {
      setPosting(true);
      const details = {
        reply4Id: r4?._id,
        userId: user?._id,
        text,
      };
      try {
        const res = await axiosInstance.post("reply5", details);
        setReply5([...reply5, res.data]);
        setNumOfComments(numOfComments + 1);
        setText("");
        setPosting(false);

        //updating reply5 array in reply4 schema
        await axiosInstance.put("reply5/reply5/" + r4?._id, {
          reply5Id: res.data._id,
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
      <div className="replies4">
        <div className="replyUsernameAndDateWrapper">
          <div className="replyUsernameAndDate">
            <h3 className="replyCommentUsername">{user5?.username}</h3>
            <span className="replyCommentDate">
              {new Date(r4?.createdAt).toDateString()}
            </span>
          </div>
        </div>
        <div className="actualReply">
          <span className="replyDescription">{r4?.text}</span>
          <span className="replyReply" onClick={handleReplyReply4}>
            reply
          </span>
          {replyReply4 && (
            <div className="textReplyWrapper">
              <h4 className="replyToUsername">
                Reply to {user5?.username}{" "}
                <span
                  onClick={() => setReplyReply4(false)}
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
                <button className="submitReply" onClick={PostReply5}>
                  {posting ? <CircularProgress color="success" /> : "Post"}
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
      {viewReplies ? (
        <>
          {reply5?.map((r5) => (
            <Reply5
              r5={r5}
              key={r5?._id}
              setNumOfComments={setNumOfComments}
              numOfComments={numOfComments}
            />
          ))}
        </>
      ) : (
        <span className="viewReplies4" onClick={() => setViewReplies(true)}>
          {reply5?.length === 0 ? null : (
            <b>{reply5?.length === 1 ? "View 1 reply" : "View all replies"}</b>
          )}
        </span>
      )}
    </>
  );
}

export default Reply4;
