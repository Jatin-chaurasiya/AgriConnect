import { useReducer, useCallback } from "react";
import { cropReducer, initialState } from "../reducers/cropReducer";
import { toast } from "react-toastify";

export const useCropRecommendation = () => {
  const [state, dispatch] = useReducer(
    cropReducer,
    initialState
  );

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();

      dispatch({
        type: "SET_LOADING",
        payload: true,
      });

      dispatch({
        type: "SET_RESULT",
        payload: null,
      });

      try {
        const response = await fetch(
          "https://croprecommendationapi-uvob.onrender.com/predict",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              nitrogen: Number(
                state.formData.nitrogen
              ),
              phosphorus: Number(
                state.formData.phosphorus
              ),
              potassium: Number(
                state.formData.potassium
              ),
              temperature: Number(
                state.formData.temperature
              ),
              humidity: Number(
                state.formData.humidity
              ),
              ph: Number(state.formData.ph),
              rainfall: Number(
                state.formData.rainfall
              ),
            }),
          }
        );

        if (!response.ok) {
          throw new Error(
            `Server Error: ${response.status}`
          );
        }

        const res = await response.json();

        const crop =
          res?.data?.crop || res?.crop;

        dispatch({
          type: "SET_RESULT",
          payload: crop,
        });

        toast.success(
          "Crop recommendation generated successfully!"
        );
      } catch (error) {
        console.error(error);

        toast.error(
          error.message ||
            "Failed to get recommendation"
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