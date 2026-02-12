export const initialState = {
  statesData: [],
  selectedState: "",
  selectedCity: "",
  village: "",
  cities: [],
  loading: false,
  weatherData: null,
};

export const weatherReducer = (state, action) => {
  switch (action.type) {
    case "SET_STATES":
      return { ...state, statesData: action.payload };

    case "SET_STATE":
      return {
        ...state,
        selectedState: action.payload,
        selectedCity: "",
        cities: action.cities || [],
      };

    case "SET_CITY":
      return { ...state, selectedCity: action.payload };

    case "SET_VILLAGE":
      return { ...state, village: action.payload };

    case "SET_LOADING":
      return { ...state, loading: action.payload };

    case "SET_WEATHER":
      return { ...state, weatherData: action.payload };

    case "RESET":
      return {
        ...initialState,
        statesData: state.statesData,
      };

    default:
      return state;
  }
};
