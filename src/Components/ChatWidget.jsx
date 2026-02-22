import React, { useEffect, useRef } from "react";
import { useChatWidget } from "../Hooks/useChatWidget";
import { FaComments, FaTimes, FaPaperPlane } from "react-icons/fa";

const ChatWidget = () => {
  const { state, dispatch, sendMessage } = useChatWidget();
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [state.messages]);

  return (
    <>
      {/* Floating Button */}
      <div
        className="chatbot-icon"
        onClick={() => dispatch({ type: "TOGGLE" })}
      >
        <FaComments size={26} />
      </div>

      {state.isOpen && (
        <div className="chatbot-popup d-flex flex-column">

          {/* Header */}
          <div className="chatbot-header">
            <strong>AgriConnect Assistant</strong>
            <FaTimes
              size={18}
              className="chatbot-close"
              onClick={() => dispatch({ type: "TOGGLE" })}
            />
          </div>

          {/* Messages */}
          <div className="chatbot-messages">
            {state.messages.map((msg, i) => (
              <div
                key={`${msg.sender}-${i}`}
                className={`message ${
                  msg.sender === "bot" ? "bot-message" : "user-message"
                }`}
              >
                {msg.text}
              </div>
            ))}

            {state.loading && (
              <div className="message bot-message typing">
                🤖 Typing...
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="chatbot-input">
            <input
              type="text"
              placeholder="Type your message..."
              value={state.input}
              disabled={state.loading}
              onChange={(e) =>
                dispatch({
                  type: "SET_INPUT",
                  payload: e.target.value,
                })
              }
              onKeyDown={(e) =>
                e.key === "Enter" && !state.loading && sendMessage()
              }
            />
            <button
              type="button"
              onClick={sendMessage}
              disabled={state.loading}
            >
              <FaPaperPlane size={16} />
            </button>
          </div>
        </div>
      )}

      {/* Styles */}
      <style>{`
        .chatbot-icon {
          position: fixed;
          bottom: 30px;
          right: 30px;
          width: 60px;
          height: 60px;
          background: linear-gradient(135deg, #1B5E20, #4CAF50);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          box-shadow: 0 8px 20px rgba(0,0,0,0.2);
          cursor: pointer;
          transition: all 0.3s ease;
          z-index: 9999;
        }

        .chatbot-icon:hover {
          transform: scale(1.1);
        }

        .chatbot-popup {
          position: fixed;
          bottom: 100px;
          right: 30px;
          width: 350px;
          height: 450px;
          background: #fff;
          border-radius: 18px;
          box-shadow: 0 8px 20px rgba(0,0,0,0.2);
          overflow: hidden;
          z-index: 1001;
        }

        .chatbot-header {
          background: linear-gradient(to right, #1B5E20, #4CAF50);
          color: white;
          padding: 15px 20px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .chatbot-close {
          cursor: pointer;
        }

        .chatbot-messages {
          flex: 1;
          padding: 15px;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .message {
          padding: 10px 14px;
          border-radius: 16px;
          max-width: 80%;
          font-size: 14px;
        }

        .bot-message {
          background: rgba(76,175,80,0.1);
          align-self: flex-start;
        }

        .user-message {
          background: #1B5E20;
          color: #fff;
          align-self: flex-end;
        }

        .typing {
          opacity: 0.7;
          font-style: italic;
        }

        .chatbot-input {
          display: flex;
          padding: 10px;
          border-top: 1px solid #ddd;
        }

        .chatbot-input input {
          flex: 1;
          padding: 10px;
          border-radius: 20px;
          border: 1px solid #ccc;
          outline: none;
        }

        .chatbot-input button {
          background: #1B5E20;
          color: white;
          border: none;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          margin-left: 10px;
          cursor: pointer;
        }

        .chatbot-input button:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }
      `}</style>
    </>
  );
};

export default ChatWidget;