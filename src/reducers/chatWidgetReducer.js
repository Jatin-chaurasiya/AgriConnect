export const initialState = {
  isOpen: false,
  messages: [
    {
      text: "👋 Hello! I'm your agriculture assistant. Ask me anything about crops, soil, weather, or farming tips.",
      sender: "bot",
    },
  ],
  input: "",
  loading: false,
};

export const chatWidgetReducer = (state, action) => {
  switch (action.type) {
    case "TOGGLE":
      return { ...state, isOpen: !state.isOpen };

    case "SET_INPUT":
      return { ...state, input: action.payload };

    case "ADD_MESSAGE":
      return {
        ...state,
        messages: [...state.messages, action.payload],
      };

    case "SET_LOADING":
      return { ...state, loading: action.payload };

    case "UPDATE_LAST":
      const updated = [...state.messages];
      updated[updated.length - 1].text = action.payload;
      return { ...state, messages: updated };

    default:
      return state;
  }
};
