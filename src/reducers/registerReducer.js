export const initialState = {
  username: "",
  email: "",
  password: "",
  language: "en",
  serviceProvider: "",
  profileImage: null,
  previewImage: null,
  loading: false,
  error: null,
};

export const registerReducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_FIELD":
      return {
        ...state,
        [action.field]: action.value,
      };

    case "SET_IMAGE":
      return {
        ...state,
        profileImage: action.payload.file,
        previewImage: action.payload.preview,
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

