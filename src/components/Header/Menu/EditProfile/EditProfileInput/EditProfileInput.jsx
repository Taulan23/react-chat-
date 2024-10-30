import "./EditProfileInput.css";

export default function EditProfileInput({
  type,
  placeholder,
  inputvalue,
  title,
  onInputChange,
}) {
  return (
    <div className="input-group">
      <label htmlFor={`edit-${type}`}>{title}</label>
      <input
        id={`edit-${type}`}
        type="text"
        placeholder={placeholder}
        value={inputvalue}
        onChange={(e) => onInputChange(type, e.target.value)}
      />
    </div>
  );
}
