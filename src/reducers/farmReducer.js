export const initialState = {
  fertilizer: { form: { cropType: "", area: "", soilType: "" }, result: null },
  seed: { form: { cropType: "", area: "", soilType: "" }, result: null },
  irrigation: { form: { cropType: "", area: "", soilType: "" }, result: null },
};

export const farmReducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_FIELD":
      return {
        ...state,
        [action.calculator]: {
          ...state[action.calculator],
          form: {
            ...state[action.calculator].form,
            [action.field]: action.value,
          },
        },
      };

    case "SET_RESULT":
      return {
        ...state,
        [action.calculator]: {
          ...state[action.calculator],
          result: action.payload,
        },
      };

    default:
      return state;
  }
};
