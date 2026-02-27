export const initialState = {
  filters: {
    schemeType: "SELECT",
    state: "SELECT",
    category: "SELECT",
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

    case "RESET_FILTERS":
      return {
        ...state,
        filters: {
          schemeType: "SELECT",
          state: "SELECT",
          category: "SELECT",
        },
        schemes: [],
        filteredSchemes: [],
      };

    default:
      return state;
  }
};