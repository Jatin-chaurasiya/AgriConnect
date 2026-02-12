import { useReducer, useRef, useCallback, useEffect } from "react";
import { chatReducer, initialState } from "../reducers/chatReducer";

export const useChatAssistant = () => {
  const [state, dispatch] = useReducer(chatReducer, initialState);

  const controllerRef = useRef(null);
  const typingIntervalRef = useRef(null);

  // ------------------- Send Message -------------------

  const sendMessage = useCallback(async () => {
    const msg = state.inputValue.trim();
    if (!msg) return;

    dispatch({ type: "ADD_MESSAGE", payload: { text: msg, sender: "user" } });
    dispatch({ type: "SET_INPUT", payload: "" });
    dispatch({ type: "SET_TYPING", payload: true });

    // Add empty bot message
    dispatch({ type: "ADD_MESSAGE", payload: { text: "", sender: "bot" } });

    controllerRef.current = new AbortController();

    try {
      const response = await fetch(
        `http://localhost:8080/api/chat?message=${encodeURIComponent(msg)}`,
        { signal: controllerRef.current.signal }
      );

      const reply = await response.text();

      typeMessage(reply);

    } catch (err) {
      dispatch({
        type: "UPDATE_LAST_MESSAGE",
        payload: "⚠️ Server error. Please try again.",
      });
      dispatch({ type: "SET_TYPING", payload: false });
    }
  }, [state.inputValue]);

  // ------------------- Typing Effect -------------------

  const typeMessage = (text) => {
    let index = 0;

    typingIntervalRef.current = setInterval(() => {
      if (index < text.length) {
        dispatch({
          type: "UPDATE_LAST_MESSAGE",
          payload: text.substring(0, index + 1),
        });
        index++;
      } else {
        clearInterval(typingIntervalRef.current);
        dispatch({ type: "SET_TYPING", payload: false });
      }
    }, 20);
  };

  // ------------------- Stop Generation -------------------

  const stopGeneration = () => {
    if (typingIntervalRef.current) {
      clearInterval(typingIntervalRef.current);
    }
    if (controllerRef.current) {
      controllerRef.current.abort();
    }
    dispatch({ type: "SET_TYPING", payload: false });
  };

  return {
    state,
    dispatch,
    sendMessage,
    stopGeneration,
  };
};
