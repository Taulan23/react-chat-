import { useState } from "react";
import "./ChatListItem.css";
import ClearIcon from "@mui/icons-material/Clear";
import DoneAllIcon from "@mui/icons-material/DoneAll";

export default function ChatListItem({
  avatar,
  name,
  status,
  lastMessage,
  lastMessageTime,
  id,
  deleteUser,
  onClick,
}) {
  const handleDeleteChat = (e) => {
    e.stopPropagation();
    deleteUser(id);
  };

  const truncateMessage = (message, maxLength) => {
    if (message.length > maxLength) {
      return message.slice(0, maxLength) + "...";
    }
    return message;
  };

  const truncatedLastMessage = truncateMessage(lastMessage, 50);

  return (
    <li id="chat-list-item" onClick={() => onClick(id)}>
      <div id="chat-list-item-info-avatar">
        <img
          style={{ width: "80px", height: "80px" }}
          src={avatar}
          alt={name}
          id="chat-list-item-avatar"
        />
        <div id="chat-list-item-info">
          <h2>{name}</h2>
          <p id="last-message-time-chat-list-item">{lastMessageTime}</p>
          <p>{truncatedLastMessage}</p>
        </div>
      </div>
      <div id="delete-chat-div">
        <button onClick={handleDeleteChat} id="delete-chat">
          <ClearIcon />
        </button>
      </div>
    </li>
  );
}

