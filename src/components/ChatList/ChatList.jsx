import React from "react";
import "./ChatList.css";
import ChatListItem from "./ChatListItem/ChatListItem";
import { useUsers } from "../../context/UsersContext";

export default function ChatList({ searchText, onChatItemClick }) {
  const { users, deleteUser } = useUsers();

  const filteredUsers = users
    .filter((user) =>
      user.name.toLowerCase().includes(searchText.toLowerCase())
    )
    .reverse();

  const ChatListItems = filteredUsers.map((user) => (
    <ChatListItem
      key={user.id}
      id={user.id}
      avatar={user.avatar}
      name={user.name}
      status={user.status}
      lastMessage={user.lastMessage}
      lastMessageTime={user.lastMessageTime}
      deleteUser={deleteUser}
      onClick={onChatItemClick}
    />
  ));

  return (
    <ul id="chat-list">
      {users.length !== 0 ? (
        <h1 id="chat-list-title">Список чатов</h1>
      ) : (
        <h1 id="chat-list-title">Список чатов пуст</h1>
      )}
      {ChatListItems}
    </ul>
  );
}

