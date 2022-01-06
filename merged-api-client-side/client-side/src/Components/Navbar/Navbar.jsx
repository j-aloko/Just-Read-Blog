import React, { useContext, useState, useEffect } from "react";
import "./Navbar.css";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import PinterestIcon from "@mui/icons-material/Pinterest";
import InstagramIcon from "@mui/icons-material/Instagram";
import SearchIcon from "@mui/icons-material/Search";
import { Link, useHistory } from "react-router-dom";
import { userContext } from "./../../Context/UserContext/UserContext";
import { Logout } from "../../Context/ApiCalls/UserApiCalls";
import SearchResults from "../SearchResults/SearchResults";
import NoResult from "./../NoResult/NoResult";
import SettingsIcon from "@mui/icons-material/Settings";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Badge from "@mui/material/Badge";
import NotificationAlert from "./../NotificationAlert/NotificationAlert";
import CloseIcon from "@mui/icons-material/Close";
import MenuIcon from "@mui/icons-material/Menu";
import Menu from "./../MenuItems/Menu";
import CircularProgress from "@mui/material/CircularProgress";
import axiosInstance from "./../../axios";

function Navbar({ socket }) {
  const { dispatch } = useContext(userContext);
  const [displaySearchBar, setDisplaySearchBar] = useState(false);
  const [authors, setAuthors] = useState([]);
  const [name, setName] = useState("");
  const [results, setResults] = useState([]);
  const [openResult, setOpenResult] = useState(false);
  const [noResult, setNoResult] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [openNotification, setOpenNotification] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [newNotification, setNewNotification] = useState(null);
  const [numOfNotifications, setNumOfNotifications] = useState();
  const [menu, setMenu] = useState(false);
  const [clearing, setClearing] = useState(false);
  const history = useHistory();

  const handleLogout = (e) => {
    e.preventDefault();
    Logout(dispatch);
    history.push("/login");
    window.location.reload();
  };

  //getting all authors array
  useEffect(() => {
    const getAllUsers = async () => {
      try {
        const res = await axiosInstance.get("users");
        setAuthors(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getAllUsers();
  }, []);

  //Handle query search
  const handleSearch = () => {
    setResults(
      authors.filter(
        (author) =>
          author.username.toLowerCase().indexOf(name.toLowerCase()) !== -1
      )
    );
    setName("");
    setOpenResult(true);
  };

  useEffect(() => {
    if (results?.length === 0) {
      setNoResult(true);
    } else if (results?.length > 0) {
      setNoResult(false);
    }
  }, [results]);

  const { user } = useContext(userContext);

  //fetch current user anytime the page renders
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axiosInstance.get("users/" + user?._id);
        setCurrentUser(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUser();
  }, [user?._id]);

  //And Receive Instant notification from socket
  useEffect(() => {
    socket?.on("receiveNotification", (data) => {
      setNewNotification({
        senderUsername: data.senderUsername,
        receiverUsername: data.receiverUsername,
        postId: data.postId,
        message: data.message,
        createdAt: Date.now(),
      });
    });
  }, [socket]);

  //Displaying Instant notification
  useEffect(() => {
    newNotification &&
      newNotification.receiverUsername === user?.username &&
      newNotification.receiverUsername !== newNotification.senderUsername &&
      setNotifications((prev) => [...prev, newNotification]);
  }, [newNotification, user?.username]);

  //getting number of notifications, tailored per each user
  useEffect(() => {
    const numberOfNotification = notifications?.filter(
      (notification) => notification?.receiverUsername === user?.username
    );
    setNumOfNotifications(numberOfNotification?.length);
  }, [notifications, user?.username]);

  const handleDeleteNotifications = async (e) => {
    e.preventDefault();
    setClearing(true);
    setNotifications([]);
    setClearing(false);
  };

  return (
    <>
      <Menu menu={menu} setMenu={setMenu} />
      <div className="navbar">
        {menu ? (
          <div className="menuItemList" onClick={() => setMenu(false)}>
            <CloseIcon />
          </div>
        ) : (
          <div className="menuItemList" onClick={() => setMenu(true)}>
            <MenuIcon />
          </div>
        )}
        <div className="navbarLeft">
          <ul className="navbarIcons">
            <li className="socialIcons">
              <FacebookIcon />
            </li>
            <li className="socialIcons">
              <TwitterIcon />
            </li>
            <li className="socialIcons">
              <PinterestIcon />
            </li>
            <li className="socialIcons">
              <InstagramIcon />
            </li>
          </ul>
        </div>
        <div className="navbarCenter">
          <ul className="navbarMenu">
            <Link to="/" className="links">
              <li className="menuItem">HOME</li>
            </Link>
            <Link to="/about" className="links">
              <li className="menuItem">ABOUT</li>
            </Link>
            <Link to="/contact" className="links">
              <li className="menuItem">CONTACT</li>
            </Link>
            <Link to="/write" className="links">
              <li className="menuItem">WRITE</li>
            </Link>
          </ul>
        </div>
        <div className="navbarRight">
          {user && (
            <img
              src={
                currentUser?.profilePic ||
                "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
              }
              alt=""
              className="navbarImage"
            />
          )}
          {!user && (
            <ul className="navbarMenu">
              <Link className="links" to="/login">
                <li className="menuItem">LOGIN</li>
              </Link>
              <Link className="links" to="/register">
                <li className="menuItem">REGISTER</li>
              </Link>
            </ul>
          )}
          <div className="searchWrapper">
            <div className="searchIcon">
              {displaySearchBar ? (
                <input
                  type="text"
                  className="searchInput"
                  placeholder="Search for author ..."
                  autoFocus={true}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              ) : null}
              <div
                className={!displaySearchBar ? "search white" : "search"}
                onMouseMove={() => setDisplaySearchBar(true)}
                onClick={handleSearch}
              >
                <SearchIcon />
              </div>
            </div>
            {openResult && !noResult && (
              <>
                {results?.map((result) => (
                  <SearchResults
                    result={result}
                    noResult={noResult}
                    setOpenResult={setOpenResult}
                  />
                ))}
              </>
            )}
            {openResult && noResult && (
              <>
                <NoResult setOpenResult={setOpenResult} />
              </>
            )}
          </div>
          {user && (
            <button className="logoutButton" onClick={handleLogout}>
              LOGOUT
            </button>
          )}
          {user && (
            <>
              <div className="notification">
                <Badge
                  badgeContent={numOfNotifications}
                  color="primary"
                  onClick={() => setOpenNotification(true)}
                >
                  <NotificationsIcon
                    color="action"
                    style={{ color: "white" }}
                  />
                </Badge>
                {openNotification ? (
                  <div className="notificationArea">
                    <div
                      className="closeNotificaton"
                      onClick={() => setOpenNotification(false)}
                    >
                      <CloseIcon style={{ fontSize: 25 }} />
                    </div>
                    <div className="notificationAlerts">
                      {notifications?.map((notification) => (
                        <NotificationAlert
                          notification={notification}
                          key={notification?._id}
                        />
                      ))}
                    </div>
                    <div className="markAsRead">
                      {numOfNotifications > 0 ? (
                        <button
                          className="mark"
                          onClick={handleDeleteNotifications}
                        >
                          {clearing ? (
                            <CircularProgress color="secondary" />
                          ) : (
                            "Clear"
                          )}
                        </button>
                      ) : (
                        <span>No New Notifications</span>
                      )}
                    </div>
                  </div>
                ) : null}
              </div>
              <>
                <Link to="/settings" className="links">
                  <SettingsIcon
                    style={{ marginLeft: 20, color: "white", marginTop: "3px" }}
                  />
                </Link>
              </>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default Navbar;
