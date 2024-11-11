import React, { useState } from "react";
import "./ChatWidget.css";

export interface ChatWidgetProps {
  id: string | undefined;
  title: string | undefined;
  lang: string | undefined;
  theme: string | undefined;
  position: string | undefined;
  direction: string | undefined;
}

const ChatWidget: React.FC<ChatWidgetProps> = ({
  id,
  title,
  lang,
  theme,
  position,
  direction,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Hello! How can I assist you?", sender: "bot" },
  ]);
  const [input, setInput] = useState("");

  const toggleChat = () => setIsOpen(!isOpen);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) =>
    setInput(e.target.value);

  const sendMessage = () => {
    if (!input.trim()) return;
    const userMessage = { text: input, sender: "user" };
    const botResponse = { text: "I'm here to help!", sender: "bot" };

    setMessages([...messages, userMessage, botResponse]);
    setInput("");
  };

  return (
    <div className="chat-widget">
      {isOpen && (
        <div className="chat-window">
          <div className="chat-header">
            {title}: {id}
          </div>
          <div className="chat-body">
            <div className="messages">
              {messages.map((msg, index) => (
                <div key={index} className={`message ${msg.sender}`}>
                  {msg.text}
                </div>
              ))}
            </div>
          </div>
          <div className="chat-footer">
            <input
              type="text"
              value={input}
              onChange={handleInput}
              placeholder="Type a message..."
            />
            <button onClick={sendMessage}>Send</button>
          </div>
        </div>
      )}

      <button onClick={toggleChat} className="chat-toggle">
        {isOpen ? "Close Chat" : "Chat with us"}
      </button>
    </div>
  );
};

export default ChatWidget;
