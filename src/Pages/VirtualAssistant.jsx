import React from "react";
import ChatWindow from "../Components/ChatWindow";
import { useChatAssistant } from "../Hooks/useChatAssistant";

const VirtualAssistant = () => {
  const { state, dispatch, sendMessage, stopGeneration } =
    useChatAssistant();

  return (
    <>
      {/* Hero Section SAME */}
      <section
        className="hero-section py-5 text-center"
        style={{ background: "#2D5016", color: "white" }}
      >
        <div className="container">
          <h1 className="display-4 fw-bold mb-3">
            Farmer's Virtual Assistant
          </h1>
          <p className="lead mb-4">
            How Can I Help You Today?
          </p>
        </div>
      </section>

      <ChatWindow
        messages={state.messages}
        inputValue={state.inputValue}
        isTyping={state.isTyping}
        dispatch={dispatch}
        sendMessage={sendMessage}
        stopGeneration={stopGeneration}
      />
    </>
  );
};

export default VirtualAssistant;
