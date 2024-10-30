import { useState, useEffect } from "react";
import "./EditProfilePhoto.css";
import { useMainAccount } from "../../../../../context/MainAccountContext";

export default function EditProfilePhoto(props) {
    const { mainAccount, setMainAccount, saveMainAccount } = useMainAccount();
    const [photoUrl, setPhotoUrl] = useState(mainAccount.avatar);
  
    useEffect(() => {
      setPhotoUrl(mainAccount.avatar);
    }, [mainAccount.avatar]);
  
    const handlePhotoChange = (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setPhotoUrl(reader.result);
          setMainAccount((prevAccount) => ({
            ...prevAccount,
            avatar: reader.result,
          }));
          saveMainAccount();
        };
        reader.readAsDataURL(file);
      }
    };
  
    return (
      <>
        <img
          style={{ width: "250px", height: "250px" }}
          src={photoUrl}
          alt={"uthvfy"}
          id="edit-profile-photo"
        />
        <input
          className="edit-profile-photo"
          type="file"
          accept="image/*"
          onChange={handlePhotoChange}
        />
      </>
    );
  }