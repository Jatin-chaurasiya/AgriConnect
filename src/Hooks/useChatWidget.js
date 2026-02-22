import { useReducer, useRef, useCallback } from "react";
import { chatWidgetReducer, initialState } from "../reducers/chatWidgetReducer";
import { BASE_URL, API_ENDPOINTS } from "../Util/apiEndpoints";

export const useChatWidget = () => {
  const [state, dispatch] = useReducer(chatWidgetReducer, initialState);
  const controllerRef = useRef(null);

  const sendMessage = useCallback(async () => {
    const msg = state.input.trim();
    if (!msg || state.loading) return;

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
      const response = await fetch(`${BASE_URL}${API_ENDPOINTS.CHATWIDGET}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: msg }),
        signal: controllerRef.current.signal,
      });

      if (!response.ok) throw new Error(response.statusText);

      const data = await response.json();

      dispatch({
        type: "UPDATE_LAST",
        payload: data.reply,
      });
    } catch (err) {
      dispatch({
        type: "UPDATE_LAST",
        payload: "⚠️ Error or timeout. Try again!",
      });
    } finally {
      dispatch({ type: "SET_LOADING", payload: false });
    }
  }, [state.input, state.loading, dispatch]);

  return { state, dispatch, sendMessage };
};