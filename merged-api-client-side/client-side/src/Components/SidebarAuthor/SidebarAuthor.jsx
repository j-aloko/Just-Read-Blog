import React, { useEffect, useState } from "react";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import PinterestIcon from "@mui/icons-material/Pinterest";
import InstagramIcon from "@mui/icons-material/Instagram";
import { Link } from "react-router-dom";
import axiosInstance from "./../../axios";

function SidebarAuthor({ author }) {
  const [category, setCategory] = useState([]);

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const res = await axiosInstance.get("categories");
        setCategory(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCategory();
  }, []);

  return (
    <div className="sidebar">
      <div className="sidebarImgAndDesc">
        <h4 className="sidebarTitle">ABOUT THE AUTHOR</h4>
        <img
          src={
            author?.profilePic ||
            "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
          }
          alt=""
          className="sidebarImg"
        />
        <p className="sidebarDesc">{author?.about}</p>
      </div>
      <div className="sidebarCategories">
        <h4 className="sidebarCategoriesTitle">CATEGORIES</h4>
        <ul className="lists">
          {category.map((c) => (
            <Link to={`/?cat=${c.name}`} key={c._id}>
              <li className="listItem">{c.name}</li>
            </Link>
          ))}
        </ul>
      </div>
      <div className="sidebarSocialHandles">
        <h4 className="sidebarSocialIconTitle">FOLLOW THE AUTHOR</h4>
        <ul className="sidebarSocialIcons">
          <li className="socialIcons">
            <a href={author?.facebook} className="links">
              <FacebookIcon className="Sicon" style={{ color: "#3b5998" }} />
            </a>
          </li>
          <li className="socialIcons">
            <a href={author?.twitter} className="links">
              {" "}
              <TwitterIcon
                className="Sicon"
                style={{ color: "#1da1f2" }}
              />{" "}
            </a>
          </li>
          <li className="socialIcons">
            <a href={author?.pinterest} className="links">
              <PinterestIcon className="Sicon" style={{ color: "#c32aa3" }} />
            </a>
          </li>
          <li className="socialIcons">
            <a href={author?.instagram} className="links">
              <InstagramIcon className="Sicon" style={{ color: "#bd081c" }} />
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default SidebarAuthor;
