import "./Menu.css";
import React from "react";
import { useNavigate } from "react-router-dom";

export default function Menu({
  setStateMenu,
  stateEditProfile,
  setStateEditProfile
}) {
  const navigate = useNavigate();

  function clickEditProfile() {
    setStateMenu(false);
    navigate('/edit/profile');
  }

  return (
    <div id="menu-container">
      <button className="menu-button">Settings</button>
      <button onClick={clickEditProfile} className="menu-button">
        Edit Profile
      </button>
    </div>
  );
}
