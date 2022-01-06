import React, { useState } from "react";
import "./Settings.css";
import SettingList from "./../../Components/SettingList/SettingList";
import ChangeArea from "../../Components/ChangeArea/ChangeArea";

function Settings() {
  const [selected, setSelected] = useState("Basic Details");

  const List = [
    {
      id: "Basic Details",
      title: "Basic Details",
    },
    {
      id: "Social Profiles",
      title: "Social Profiles",
    },
    {
      id: "About",
      title: "About",
    },
  ];
  return (
    <div className="settings">
      <SettingList List={List} selected={selected} setSelected={setSelected} />
      <ChangeArea selected={selected} />
    </div>
  );
}

export default Settings;
