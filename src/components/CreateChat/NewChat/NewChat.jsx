import "./NewChat.css";
import { getImagePath } from "../../../data";

export default function NewChat({ addNewUsers, userName }) {
  return (
    <div onClick={() => addNewUsers(userName)} id="new-chat">
      <img
        id="new-user-avatar"
        src={getImagePath("no-avatar-user.jpg")}
        alt="user-avatar"
      />
      <div className="new-chat-info">
        <h2>{userName}</h2>
        <p>недавно</p>
      </div>
    </div>
  );
}

