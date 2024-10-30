import { useState } from "react";
import "./CreateChatButton.css";
import AddIcon from "@mui/icons-material/Add";
import CreateChatWindow from "../CreateChatWindow/CreateChatWindow";

export default function CreateChatButton() {
  const [stateCreateChatButton, setStateCreateChatButton] = useState(false);

  function clickCreateChatButton() {
    setStateCreateChatButton(!stateCreateChatButton);
  }

  return (
    <>
      {stateCreateChatButton === true && (
        <CreateChatWindow
          stateCreateChatButton={stateCreateChatButton}
          setStateCreateChatButton={setStateCreateChatButton}
        />
      )}
      <button onClick={clickCreateChatButton} id="create-chat-button">
        <AddIcon id="create-chat-icon" />
      </button>
    </>
  );
}

