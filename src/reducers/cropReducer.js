export const initialState = {
  formData: {
    nitrogen: "",
    phosphorus: "",
    potassium: "",
    temperature: "",
    humidity: "",
    ph: "",
    rainfall: "",
  },
  loading: false,
  recommendedCrop: null,

  plannerLoading: false,
  cropPlanner: null,
  plannerError: null,
};

export const cropReducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_FIELD":
      return {
        ...state,
        formData: {
          ...state.formData,
          [action.field]: action.value,
        },
      };

    case "SET_LOADING":
      return {
        ...state,
        loading: action.payload,
      };

    case "SET_RESULT":
      return {
        ...state,
        recommendedCrop: action.payload,
      };

    case "PLANNER_REQUEST":
      return {
        ...state,
        plannerLoading: true,
        cropPlanner: null,
        plannerError: null,
      };

    case "PLANNER_SUCCESS":
      return {
        ...state,
        plannerLoading: false,
        cropPlanner: action.payload,
        plannerError: null,
      };

    case "PLANNER_FAILURE":
      return {
        ...state,
        plannerLoading: false,
        cropPlanner: null,
        plannerError: action.payload,
      };
    case "RESET":
      return initialState;

    default:
      return state;
  }
};
