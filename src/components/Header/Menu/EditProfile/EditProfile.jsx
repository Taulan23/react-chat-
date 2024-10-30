import { useState } from "react";
import "./EditProfile.css";
import EditProfileInput from "./EditProfileInput/EditProfileInput";
import { useMainAccount } from "../../../../context/MainAccountContext";
import EditProfilePhoto from "./EditProfilePhoto/EditProfilePhoto";

export default function EditProfile({ onInputChange }) {
  const { mainAccount } = useMainAccount();

  return (
    <div className="edit-profile-page">
      <div className="edit-profile-container">
        <form id="edit-profile">
          <EditProfilePhoto mainAccount={mainAccount} />
          <EditProfileInput
            type="name"
            placeholder="Новое имя"
            inputvalue={mainAccount.name}
            title="Имя"
            onInputChange={onInputChange}
          />
          <EditProfileInput
            type="username"
            placeholder="Новый username"
            inputvalue={mainAccount.username}
            title="Username"
            onInputChange={onInputChange}
          />
          <EditProfileInput
            type="bio"
            placeholder="О себе"
            inputvalue={mainAccount.bio}
            title="Описание"
            onInputChange={onInputChange}
          />
        </form>
      </div>
    </div>
  );
}
