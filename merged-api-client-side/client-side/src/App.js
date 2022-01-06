import "./App.css";
import Homepage from "./Pages/Homepage/Homepage";
import Postpage from "./Pages/Read-Post-Page/Postpage";
import Write from "./Pages/Write-Post-Page/Write";
import Settings from "./Pages/Profile Settings/Settings";
import Login from "./Pages/Login Page/Login";
import Register from "./Pages/Register Page/Register";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { userContext } from "./Context/UserContext/UserContext";
import AuthorsPost from "./Pages/AuthorsPosts/AuthorsPost";
import About from "./Pages/AboutPage/About";
import Contact from "./Pages/ContactPage/Contact";
import { io } from "socket.io-client";
import Navbar from "./Components/Navbar/Navbar";

function App() {
  const { user } = useContext(userContext);
  const [socket, setSocket] = useState(null);

  //on app render, initilize socket connection
  useEffect(() => {
    setSocket(io());
  }, []);

  return (
    <Router>
      <Navbar socket={socket} />
      <Switch>
        <Route exact path="/">
          <Homepage />
        </Route>
        <Route path="/register">{user ? <Homepage /> : <Register />}</Route>
        <Route path="/login">{user ? <Homepage /> : <Login />}</Route>
        <Route path="/post/:postId">
          <Postpage socket={socket} />
        </Route>
        <Route path="/settings">{user ? <Settings /> : <Register />}</Route>
        <Route path="/write">{user ? <Write /> : <Register />}</Route>
        <Route path="/author">
          <AuthorsPost />
        </Route>
        <Route path="/about">
          <About />
        </Route>
        <Route path="/contact">
          <Contact />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
