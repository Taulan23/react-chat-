import "./CreateChatWindow.css";
import { useState } from "react";
import NewChat from "../NewChat/NewChat";
import { useUsers } from "../../../context/UsersContext";
import { getImagePath } from "../../../data";

export default function CreateChatWindow({
  setStateCreateChatButton,
  stateCreateChatButton,
}) {
  const [newUserName, setNewUserName] = useState("");

  function clickСancellationButton(event) {
    event.preventDefault();
    setStateCreateChatButton(false);
  }

  function handleKeyDown(event) {
    if (event.key === "Enter" && newUserName !== "") {
      event.preventDefault();
      addNewUsers(newUserName);
      setNewUserName("");
    }
  }

  const { users, setUsers } = useUsers();

  function addNewUsers(newUserName) {
    const newUser = {
      id: Date.now(),
      name: newUserName,
      avatar: getImagePath("no-avatar-user.jpg"),
      status: "недавно",
      lastMessage: "Нет сообщений",
      lastMessageTime: "",
    };

    setUsers((prevUsers) => {
      const updatedUsers = [...prevUsers, newUser];
      return updatedUsers;
    });
    setNewUserName("");
    setStateCreateChatButton(false);
  }

  function handleInputChange(event) {
    const value = event.target.value;
    if (value.length > 18) {
      setNewUserName(value.slice(0, 25) + "...");
    } else {
      setNewUserName(value);
    }
  }

  return (
    <>
      {stateCreateChatButton === true && (
        <div id="create-new-chat">
          <h1 id="add-new-user-title">Написать сообщение</h1>
          {newUserName !== "" && (
            <NewChat addNewUsers={addNewUsers} userName={newUserName} />
          )}

          <form id="create-new-chat-form" action="/">
            <input
              id="new-user-name-input"
              name="message-text"
              placeholder="Введите имя пользователя"
              type="text"
              autoComplete="off"
              value={newUserName}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
            />
            <button
              onClick={clickСancellationButton}
              id="cancellation-create-new-chat"
            >
              Отмена
            </button>
          </form>
        </div>
      )}
    </>
  );
}

