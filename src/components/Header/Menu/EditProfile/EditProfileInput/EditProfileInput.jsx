import "./EditProfileInput.css";

export default function EditProfileInput({
  type,
  placeholder,
  inputvalue,
  title,
  onInputChange,
  error
}) {
  return (
    <div className="edit-profile-input-container">
      <span className="edit-profile-input-title">{title}</span>
      <input
        type="text"
        className={`edit-profile-input ${error ? 'error' : ''}`}
        placeholder={placeholder}
        value={inputvalue}
        onChange={(e) => onInputChange(type, e.target.value)}
      />
      {error && <span className="error-message">{error}</span>}
    </div>
  );
}
