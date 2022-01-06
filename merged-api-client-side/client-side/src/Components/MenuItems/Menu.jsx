import React, { useContext } from "react";
import "./Menu.css";
import { Link, useHistory } from "react-router-dom";
import { userContext } from "./../../Context/UserContext/UserContext";
import { Logout } from "../../Context/ApiCalls/UserApiCalls";

function Menu({ setMenu, menu }) {
  const { dispatch, user } = useContext(userContext);
  const history = useHistory();

  const handleLogout = (e) => {
    e.preventDefault();
    Logout(dispatch);
    setMenu(false);
    history.push("/login");
    window.location.reload();
  };

  return (
    <div className={menu ? "menuContainer menu" : "menuContainer"}>
      <ul className="menuItemsx">
        <Link to="/" className="links">
          <li onClick={() => setMenu(false)}>Home</li>
        </Link>
        <Link to="/about" className="links">
          <li onClick={() => setMenu(false)}>About</li>
        </Link>
        <Link to="/contact" className="links">
          <li onClick={() => setMenu(false)}>Contact</li>
        </Link>
        <Link to="/login" className="links">
          {!user && <li onClick={() => setMenu(false)}>Login</li>}
        </Link>
        <Link to="/register" className="links">
          {!user && <li onClick={() => setMenu(false)}>Register</li>}
        </Link>
        {user && <li onClick={handleLogout}>Logout</li>}
      </ul>
    </div>
  );
}

export default Menu;
