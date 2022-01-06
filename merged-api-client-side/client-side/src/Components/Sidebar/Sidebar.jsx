import React, { useEffect, useState } from "react";
import "./Sidebar.css";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import PinterestIcon from "@mui/icons-material/Pinterest";
import InstagramIcon from "@mui/icons-material/Instagram";
import { Link } from "react-router-dom";
import axiosInstance from "./../../axios";

function Sidebar() {
  const [category, setCategory] = useState([]);

  useEffect(() => {
    const fetchCategory = async () => {
      const res = await axiosInstance.get("categories");
      setCategory(res.data);
    };
    fetchCategory();
  }, []);

  return (
    <div className="sidebar">
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
        <h4 className="sidebarSocialIconTitle">FOLLOW US</h4>
        <ul className="sidebarSocialIcons">
          <li className="socialIcons">
            <FacebookIcon className="Sicon" />
          </li>
          <li className="socialIcons">
            <TwitterIcon className="Sicon" />
          </li>
          <li className="socialIcons">
            <PinterestIcon className="Sicon" />
          </li>
          <li className="socialIcons">
            <InstagramIcon className="Sicon" />
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;
