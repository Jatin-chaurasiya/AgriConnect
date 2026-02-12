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
      dispatch({ type: "SET_LOADING", payload: true });
      dispatch({ type: "SET_RESULT", payload: null });

      try {
        const response = await fetch(
          "http://localhost:8080/recommend",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(state.formData),
          }
        );

        if (!response.ok)
          throw new Error("Server error");

        const data = await response.json();

        dispatch({
          type: "SET_RESULT",
          payload:
            data.recommendedCrop ||
            data.crop ||
            data,
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
