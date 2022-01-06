import React from "react";
import "./Lists.css";

function Lists({ item, active, setSelected }) {
  return (
    <ul className="settinglistItems">
      <div
        className={active ? "profileListItems active" : "profileListItems"}
        onClick={() => setSelected(item.id)}
      >
        <li className="ListTitles">{item.title}</li>
      </div>
    </ul>
  );
}

export default Lists;
