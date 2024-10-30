import React, { useState, useEffect } from "react";
import "./Chat.css";
import SendMessageInput from "./SendMessageInput/SendMessageInput";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import { useUsers } from "../../context/UsersContext";
import { mainAccount } from "../../data";
import Header from "../Header/Header";
import { useMainAccount } from "../../context/MainAccountContext";

export default function Chat({ user, onBack }) {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState(() => {
    const storedMessages = localStorage.getItem(`chat_${user.id}`);
    return storedMessages ? JSON.parse(storedMessages) : [];
  });

  const [currentUser, setCurrentUser] = useState(user);
  const [newMessageId, setNewMessageId] = useState(null);

  const { updateLastMessage } = useUsers();
  const { mainAccount } = useMainAccount();

  useEffect(() => {
    localStorage.setItem(`chat_${user.id}`, JSON.stringify(messages));
  }, [messages, user.id]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (message.trim() !== "") {
      const newMessage = {
        id: Date.now(),
        text: message,
        time: new Date()
          .toLocaleTimeString()
          .slice(0, new Date().toLocaleTimeString().length - 3),
        sender: currentUser.id === user.id ? "self" : "other",
      };
      setMessages([...messages, newMessage]);
      setMessage("");
      setNewMessageId(newMessage.id);

      updateLastMessage(user.id, newMessage.text, newMessage.time);
    }
  };

  const handleSwitchUser = () => {
    setCurrentUser((prevUser) =>
      prevUser.id === user.id ? mainAccount : user
    );
  };

  return (
    <div className="chat">
      <Header
        isChatOpen={true}
        onBack={onBack}
        selectedUser={currentUser}
        onSwitchUser={handleSwitchUser}
      />
      <div className="chat-messages">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`message ${
              msg.sender === (currentUser.id === user.id ? "self" : "other")
                ? "message-self"
                : "message-other"
            } ${newMessageId === msg.id ? "new-message-animation" : ""}`}
          >
            <div className="text-message">{msg.text}</div>
            <div className="time-done-all-icon-message">
              <div className="time-message">{msg.time} </div>
              <div className="done-all-icon-message">
                <DoneAllIcon
                  style={{
                    height: "15px",
                    width: "15px",
                  }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
      <SendMessageInput
        handleSendMessage={handleSendMessage}
        setMessage={setMessage}
        message={message}
      />
    </div>
  );
}

