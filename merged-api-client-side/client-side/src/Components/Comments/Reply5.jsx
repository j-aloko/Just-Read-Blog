import React, { useState, useEffect } from "react";
import axiosInstance from "./../../axios";

function Reply5({ r5 }) {
  const [user6, setUser6] = useState({});

  //fetch User who made reply 4
  useEffect(() => {
    const getSpecificUser = async () => {
      try {
        const res = await axiosInstance.get("users/" + r5?.userId);
        setUser6(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getSpecificUser();
  }, [r5?.userId]);

  return (
    <div className="replies5">
      <div className="replyUsernameAndDate">
        <h3 className="replyCommentUsername">{user6?.username}</h3>
        <span className="replyCommentDate">
          {new Date(r5?.createdAt).toDateString()}
        </span>
      </div>
      <div className="actualReply">
        <span className="replyDescription">{r5?.text}</span>
      </div>
    </div>
  );
}

export default Reply5;
