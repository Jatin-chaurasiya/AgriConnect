export const initialState = {
  messages: [
    { text: "Hello! 👋 Ask me anything about agriculture.", sender: "bot" }
  ],
  inputValue: "",
  isTyping: false,
  isListening: false,
};

export const chatReducer = (state, action) => {
  switch (action.type) {
    case "SET_INPUT":
      return { ...state, inputValue: action.payload };

    case "ADD_MESSAGE":
      return {
        ...state,
        messages: [...state.messages, action.payload],
      };

    case "UPDATE_LAST_MESSAGE":
      const updated = [...state.messages];
      updated[updated.length - 1].text = action.payload;
      return { ...state, messages: updated };

    case "SET_TYPING":
      return { ...state, isTyping: action.payload };

    case "SET_LISTENING":
      return { ...state, isListening: action.payload };

    default:
      return state;
  }
};
