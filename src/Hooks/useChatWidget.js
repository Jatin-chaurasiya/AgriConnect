import { useReducer, useRef, useCallback } from "react";
import { chatWidgetReducer, initialState } from "../reducers/chatWidgetReducer";

export const useChatWidget = () => {
  const [state, dispatch] = useReducer(
    chatWidgetReducer,
    initialState
  );

  const controllerRef = useRef(null);

  const sendMessage = useCallback(async () => {
    const msg = state.input.trim();
    if (!msg) return;

    dispatch({
      type: "ADD_MESSAGE",
      payload: { text: msg, sender: "user" },
    });

    dispatch({ type: "SET_INPUT", payload: "" });

    dispatch({
      type: "ADD_MESSAGE",
      payload: {
        text: "🤖 Fetching agriculture info...",
        sender: "bot",
      },
    });

    dispatch({ type: "SET_LOADING", payload: true });

    controllerRef.current = new AbortController();

    try {
      const response = await fetch(
        `/chat?message=${encodeURIComponent(msg)}`,
        { signal: controllerRef.current.signal }
      );

      if (!response.ok)
        throw new Error(response.statusText);

      const reply = await response.text();

      dispatch({
        type: "UPDATE_LAST",
        payload: reply,
      });
    } catch (err) {
      dispatch({
        type: "UPDATE_LAST",
        payload: "⚠️ Error or timeout. Try again!",
      });
    } finally {
      dispatch({
        type: "SET_LOADING",
        payload: false,
      });
    }
  }, [state.input]);

  return { state, dispatch, sendMessage };
};
