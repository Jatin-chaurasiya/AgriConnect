export const initialState = {
  filters: {
    schemeType: "",
    state: "",
    category: "",
  },
  schemes: [],
  filteredSchemes: [],
};

export const schemesReducer = (state, action) => {
  switch (action.type) {
    case "SET_SCHEMES":
      return {
        ...state,
        schemes: action.payload,
        filteredSchemes: action.payload,
      };

    case "SET_FILTER":
      return {
        ...state,
        filters: {
          ...state.filters,
          [action.field]: action.value,
        },
      };

    case "SET_FILTERED":
      return {
        ...state,
        filteredSchemes: action.payload,
      };

    case "RESET_FILTERS":
      return {
        ...state,
        filters: { schemeType: "", state: "", category: "" },
        filteredSchemes: state.schemes,
      };

    default:
      return state;
  }
};
