import React, { useEffect, useRef } from "react";
import { useChatWidget } from "../Hooks/useChatWidget";
import { FaComments, FaTimes, FaPaperPlane } from "react-icons/fa";

const ChatWidget = () => {
  const { state, dispatch, sendMessage } = useChatWidget();

  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [state.messages]);

  return (
    <>
      {/* Floating Icon */}
      <div
        className="chatbot-icon"
        onClick={() => dispatch({ type: "TOGGLE" })}
      >
        <FaComments size={26} />
      </div>

      {/* Popup */}
      {state.isOpen && (
        <div className="chatbot-popup d-flex">
          <div className="chatbot-header">
            <strong>AgriConnect Assistant</strong>
            <span
              className="chatbot-close"
              onClick={() => dispatch({ type: "TOGGLE" })}
            >
              <FaTimes size={18} />
            </span>
          </div>

          <div className="chatbot-messages">
            {state.messages.map((msg, i) => (
              <div
                key={i}
                className={`message ${
                  msg.sender === "bot" ? "bot-message" : "user-message"
                }`}
              >
                {msg.text}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <div className="chatbot-input">
            <input
              type="text"
              placeholder="Type your message..."
              value={state.input}
              onChange={(e) =>
                dispatch({
                  type: "SET_INPUT",
                  payload: e.target.value,
                })
              }
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />
            <button onClick={sendMessage}>
              <FaPaperPlane size={16} />
            </button>
          </div>
        </div>
      )}

      {/* SAME CSS */}
      <style>{`
        .chatbot-icon {
          position: fixed;
          bottom: 30px;
          right: 30px;
          width: 60px;
          height: 60px;
          background: linear-gradient(135deg, #4a7c3a, #6fbf73);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 24px;
          box-shadow: 0 6px 12px rgba(0,0,0,0.2);
          cursor: pointer;
          transition: 0.3s;
          z-index: 1000;
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
          flex-direction: column;
          overflow: hidden;
          z-index: 1001;
        }
        .chatbot-header {
          background: linear-gradient(to right, #4a7c3a, #6fbf73);
          color: white;
          padding: 15px 20px;
          display: flex;
          justify-content: space-between;
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
        }
        .bot-message {
          background: rgba(74,124,58,0.1);
          align-self: flex-start;
        }
        .user-message {
          background: #4a7c3a;
          color: #fff;
          align-self: flex-end;
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
        }
        .chatbot-input button {
          background: #4a7c3a;
          color: white;
          border: none;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          margin-left: 10px;
        }
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

      `}</style>
    </>
  );
};

export default ChatWidget;
