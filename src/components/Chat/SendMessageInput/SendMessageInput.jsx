import "./SendMessageInput.css";

export default function SendMessageInput({
  handleSendMessage,
  setMessage,
  message,
}) {
  return (
    <form id="send-message-form" onSubmit={handleSendMessage}>
      <input
        id="send-message-input"
        name="message-text"
        placeholder="Введите сообщение"
        type="text"
        autoComplete="off"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button id="send-message-button" type="submit">
        Отправить
      </button>
    </form>
  );
}

