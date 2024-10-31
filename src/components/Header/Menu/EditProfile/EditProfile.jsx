import { useState } from "react";
import "./EditProfile.css";
import EditProfileInput from "./EditProfileInput/EditProfileInput";
import { useMainAccount } from "../../../../context/MainAccountContext";
import EditProfilePhoto from "./EditProfilePhoto/EditProfilePhoto";

export default function EditProfile({ onInputChange }) {
  const { mainAccount } = useMainAccount();
  const [errors, setErrors] = useState({
    name: '',
    username: ''
  });

  const validateInput = (type, value) => {
    let error = '';
    
    if (type === 'name' && !value.trim()) {
      error = 'Имя не может быть пустым';
    }
    
    if (type === 'username') {
      if (!value.startsWith('@')) {
        error = 'Username должен начинаться с @';
      } else if (value.length < 6) {
        error = 'Username должен содержать минимум 6 символов';
      }
    }

    setErrors(prev => ({
      ...prev,
      [type]: error
    }));

    return !error;
  };

  const handleInputChange = (type, value) => {
    validateInput(type, value);
    onInputChange(type, value);
  };

  const handlePhotoChange = () => {
    onInputChange('photo', 'changed'); // Уведомляем о изменении фото
  };

  return (
    <div className="edit-profile-page">
      <div className="edit-profile-container">
        <form id="edit-profile">
          <EditProfilePhoto onPhotoChange={handlePhotoChange} />
          <EditProfileInput
            type="name"
            placeholder="Новое имя"
            inputvalue={mainAccount.name}
            title="Имя"
            onInputChange={handleInputChange}
            error={errors.name}
          />
          <EditProfileInput
            type="username"
            placeholder="Новый username"
            inputvalue={mainAccount.username}
            title="Username"
            onInputChange={handleInputChange}
            error={errors.username}
          />
          <EditProfileInput
            type="bio"
            placeholder="О себе"
            inputvalue={mainAccount.bio}
            title="Описание"
            onInputChange={handleInputChange}
          />
        </form>
      </div>
    </div>
  );
}
