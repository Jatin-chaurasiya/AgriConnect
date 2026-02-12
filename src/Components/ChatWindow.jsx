import React, { useRef, useEffect } from "react";

const ChatWindow = ({
  messages,
  inputValue,
  isTyping,
  dispatch,
  sendMessage,
  stopGeneration,
}) => {
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <>
      <section className="py-5 bg-light">
        <div className="container d-flex justify-content-center">
          <div className="chatbot-box">

            {/* Header */}
            <div className="chatbot-header p-3 text-white rounded-top">
              <strong>AgriConnect Assistant</strong>
            </div>

            {/* Messages */}
            <div className="chatbot-body border p-3 bg-white">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`message mb-2 ${msg.sender === "user" ? "user-message" : "bot-message"}`}
                  style={{ textAlign: msg.sender === "user" ? "right" : "left" }}
                >
                  <span>{msg.text}</span>
                </div>
              ))}
              <div ref={bottomRef} />
            </div>

            {/* Footer */}
            <div className="chatbot-footer d-flex p-2 border rounded-bottom">
              <input
                type="text"
                className="form-control me-2"
                placeholder="Type your message..."
                value={inputValue}
                onChange={(e) =>
                  dispatch({ type: "SET_INPUT", payload: e.target.value })
                }
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                disabled={isTyping}
              />

              <button
                className="btn btn-light text-success"
                onClick={sendMessage}
                disabled={isTyping}
              >
                <i className="fas fa-paper-plane"></i>
              </button>

              <button
                className="btn btn-light text-danger ms-2"
                onClick={stopGeneration}
                disabled={!isTyping}
              >
                <i className="fas fa-stop"></i>
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* SAME CSS */}
      <style>{`
        .chatbot-box {
          width: 100%;
          max-width: 600px;
          border-radius: 12px;
          box-shadow: 0 4px 15px rgba(0,0,0,0.1);
          font-size: 18px;
        }

        .chatbot-header {
          background: linear-gradient(135deg, #2D5016, #4CAF50);
        }

        .chatbot-body {
          height: 450px;
          overflow-y: auto;
          padding: 10px;
          background-color: #f9f9f9;
        }

        .message span {
          display: inline-block;
          padding: 12px 16px;
          border-radius: 12px;
          max-width: 75%;
          word-wrap: break-word;
          white-space: pre-wrap;
          font-size: 16px;
        }

        .user-message span {
          background-color: #6c757d !important;
          color: white;
        }

        .bot-message span {
          background-color: #28a745 !important;
          color: white;
        }

        .chatbot-footer {
          background: linear-gradient(135deg, #2D5016, #4CAF50);
        }

        .btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
      `}</style>
    </>
  );
};

export default ChatWindow;
