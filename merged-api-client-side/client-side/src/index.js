import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { UserContextProvider } from "./Context/UserContext/UserContext";
import { PostsContextProvider } from "./Context/PostContext/postContext";

ReactDOM.render(
  <UserContextProvider>
    <PostsContextProvider>
      <App />
    </PostsContextProvider>
  </UserContextProvider>,
  document.getElementById("root")
);

reportWebVitals();
