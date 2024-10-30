import "./Header.css";
import React, { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import SearchUserInput from "./SearchUserInput/SearchUserInput";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import LoopIcon from "@mui/icons-material/Loop";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Menu from "./Menu/Menu";
import CheckIcon from '@mui/icons-material/Check';
import { useMainAccount } from "../../context/MainAccountContext";
import { useNavigate } from "react-router-dom";

export default function Header({
  searchText,
  onSearchChange,
  setSearchText,
  isChatOpen,
  onBack,
  selectedUser,
  onSwitchUser,
  isProfileEdit,
  showEditButtons,
  onSave
}) {
  const [stateSearchButton, setStateSearchButton] = useState(false);
  const [stateMenu, setStateMenu] = useState(false);
  const [showSaveMessage, setShowSaveMessage] = useState(false);
  const navigate = useNavigate();

  function clickMenuButton() {
    setStateMenu(!stateMenu);
  }

  function clickSearchButton() {
    setStateSearchButton(!stateSearchButton);
    if (!stateSearchButton) {
      setSearchText("");
    }
  }

  const handleSave = () => {
    onSave();
    setShowSaveMessage(true);
    setTimeout(() => {
      setShowSaveMessage(false);
    }, 2000);
  };

  return (
    <header>
      <div id="header-section" className="header-left-section">
        {(isChatOpen || isProfileEdit) && (
          <button onClick={onBack} id="header-back-button" className="fade-in">
            <ArrowBackIcon id="header-icon" />
          </button>
        )}
        {!isProfileEdit && !isChatOpen && (
          <button onClick={clickMenuButton} className="header-button">
            <MenuIcon id="header-icon" />
          </button>
        )}
        {stateMenu && (
          <Menu
            setStateMenu={setStateMenu}
          />
        )}
      </div>
      <div id="header-section" className="header-central-section">
        {isChatOpen ? (
          <div id="person">
            <img
              src={selectedUser.avatar}
              alt={selectedUser.name}
              id="person-photo"
            />
            <div id="person-name-status">
              <h1 id="person-name">{selectedUser.name}</h1>
              <p id="person-status">{selectedUser.status}</p>
            </div>
          </div>
        ) : isProfileEdit ? (
          <div className="edit-profile-title">
            <h1 id="messenger-name">Edit Profile</h1>
            {showSaveMessage && <p className="save-message fade-in">Изменения сохранены</p>}
          </div>
        ) : (
          <h1 id="messenger-name">Messenger</h1>
        )}
      </div>
      <div id="header-section" className="header-right-section">
        {isChatOpen ? (
          <div id="header-chat-icons-right">
            <LoopIcon id="header-icon" onClick={onSwitchUser} />
            <MoreVertIcon id="header-icon" />
            <SearchIcon id="header-icon" />
          </div>
        ) : isProfileEdit && showEditButtons ? (
          <button onClick={handleSave} className="header-button fade-in">
            <CheckIcon id="header-icon" />
          </button>
        ) : !isProfileEdit && (
          <div className="search-container">
            {stateSearchButton && (
              <SearchUserInput
                searchText={searchText}
                onSearchChange={onSearchChange}
                stateSearchButton={stateSearchButton}
                setSearchText={setSearchText}
              />
            )}
            <button onClick={clickSearchButton} className="header-button">
              <SearchIcon id="header-icon" />
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
