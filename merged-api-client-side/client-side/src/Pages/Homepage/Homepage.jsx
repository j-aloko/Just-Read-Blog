import React, { useEffect, useState } from "react";
import Header from "./../../Components/Header/Header";
import "./Homepage.css";
import Posts from "./../../Components/Posts/Posts";
import Sidebar from "./../../Components/Sidebar/Sidebar";
import axiosInstance from "./../../axios";
import { useLocation } from "react-router-dom";

function Homepage() {
  const [posts, setPosts] = useState([]);
  const { search } = useLocation();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axiosInstance.get(`posts${search}`);
        setPosts(
          res.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        );
      } catch (error) {
        console.log(error);
      }
    };
    fetchPosts();
  }, [search]);

  return (
    <>
      <Header />
      <div className="homepage">
        <Posts posts={posts} />
        <Sidebar />
      </div>
    </>
  );
}

export default Homepage;
