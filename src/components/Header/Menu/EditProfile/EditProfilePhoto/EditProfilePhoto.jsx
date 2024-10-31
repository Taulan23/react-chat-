import { useState } from "react";
import "./EditProfilePhoto.css";
import { useMainAccount } from "../../../../../context/MainAccountContext";

export default function EditProfilePhoto({ onPhotoChange }) {
    const { mainAccount, setMainAccount } = useMainAccount();
    const [photoUrl, setPhotoUrl] = useState(mainAccount.avatar);
  
    const handlePhotoChange = (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          const newPhotoUrl = reader.result;
          setPhotoUrl(newPhotoUrl);
          setMainAccount(prev => ({
            ...prev,
            avatar: newPhotoUrl
          }));
          onPhotoChange();
        };
        reader.readAsDataURL(file);
      }
    };
  
    return (
      <div className="edit-profile-photo-container">
        <img
          src={photoUrl || mainAccount.avatar}
          alt="Profile"
          id="edit-profile-photo"
        />
        <label className="photo-upload-label" htmlFor="photo-upload">
          Изменить фото
        </label>
        <input
          id="photo-upload"
          type="file"
          accept="image/*"
          onChange={handlePhotoChange}
        />
      </div>
    );
}