export const initialState = {
  email: "",
  password: "",
  loading: false,
  error: null,
};

export const loginReducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_FIELD":
      return {
        ...state,
        [action.field]: action.value,
      };

    case "SET_LOADING":
      return { ...state, loading: action.payload };

    case "SET_ERROR":
      return { ...state, error: action.payload };

    case "RESET":
      return initialState;

    default:
      return state;
  }
};
