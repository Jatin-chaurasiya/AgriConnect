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

    if (controllerRef.current) {
      controllerRef.current.abort();
    }
    controllerRef.current = new AbortController();

    const token = localStorage.getItem("token");

    try {
      const response = await fetch(`${BASE_URL}${API_ENDPOINTS.CHATWIDGET}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` }),
        },
        body: JSON.stringify({ message: msg }),
        signal: controllerRef.current.signal,
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => null);
        const errMsg =
          errData?.message || response.statusText || "Server Error";
        throw new Error(`${response.status}: ${errMsg}`);
      }

      const data = await response.json();

      const botReply =
        data.reply ||
        data.message ||
        data.response ||
        data.answer ||
        "No response from server.";

      dispatch({
        type: "UPDATE_LAST",
        payload: botReply,
      });
    } catch (err) {
      if (err.name === "AbortError") return;

      console.error("❌ Chat Error:", err.message);

      dispatch({
        type: "UPDATE_LAST",
        payload: `⚠️ Error: ${err.message || "Something went wrong. Try again!"}`,
      });
    } finally {
      dispatch({ type: "SET_LOADING", payload: false });
    }
  }, [state.input, state.loading, dispatch]);

  return { state, dispatch, sendMessage };
};