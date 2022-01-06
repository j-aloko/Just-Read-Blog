import React, { useEffect, useState, useContext } from "react";
import "./NotificationAlert.css";
import { userContext } from "./../../Context/UserContext/UserContext";
import axiosInstance from "./../../axios";

function NotificationAlert({ notification }) {
  const [post, setPost] = useState({});

  //get currentUser

  const { user } = useContext(userContext);

  //fetching Post Commented on if any
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await axiosInstance.get("posts/" + notification?.postId);
        setPost(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchPost();
  }, [notification?.postId]);

  return (
    <>
      {notification?.receiverUsername === user?.username && (
        <div className="notifyAndImg">
          <span>
            <b>{notification?.senderUsername}</b> {notification?.message}
          </span>
          <img src={post?.photo} alt="" className="notificationImg" />
        </div>
      )}
    </>
  );
}

export default NotificationAlert;
