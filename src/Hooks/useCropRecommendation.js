import { useReducer, useCallback, useState } from "react";
import { cropReducer, initialState } from "../reducers/cropReducer";
import { toast } from "react-toastify";

export const useCropRecommendation = () => {
  const [state, dispatch] = useReducer(
    cropReducer,
    initialState
  );
  const [result, setResult] = useState(null);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      dispatch({ type: "SET_LOADING", payload: true });
      dispatch({ type: "SET_RESULT", payload: null });

      try {
        const response = await fetch(
          "https://croprecommendationapi-uvob.onrender.com/predict",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
          nitrogen: Number(data.nitrogen),
          phosphorus: Number(data.phosphorus),
          potassium: Number(data.potassium),
          temperature: Number(data.temperature),
          humidity: Number(data.humidity),
          ph: Number(data.ph),
          rainfall: Number(data.rainfall),
        }),
          }
        );

        if (!response.ok)
          throw new Error("Server error");

        const res = await response.json();

        dispatch({
          type: "SET_RESULT",
          payload:
            res?.data?.crop ||
            res?.crop
        });

        toast.success(
          "Crop recommendation generated successfully!"
        );
      } catch (error) {
        toast.error(
          "Failed to get recommendation."
        );
      } finally {
        dispatch({
          type: "SET_LOADING",
          payload: false,
        });
      }
    },
    [state.formData]
  );

  const handleReset = () => {
    dispatch({ type: "RESET" });
  };

  return {
    state,
    dispatch,
    handleSubmit,
    handleReset,
  };
};
