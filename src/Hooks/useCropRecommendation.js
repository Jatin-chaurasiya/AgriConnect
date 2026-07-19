import { useReducer, useCallback } from "react";
import { toast } from "react-toastify";
import { getCropPlanner } from "./cropPlannerApi";
import {
  cropReducer,
  initialState,
} from "../reducers/cropReducer";
import {
  BASE_URL,
  API_ENDPOINTS,
} from "../Util/apiEndPoints";

export const useCropRecommendation = () => {
  const [state, dispatch] = useReducer(
    cropReducer,
    initialState
  );

  // ================= Crop Recommendation =================

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

      dispatch({
        type: "PLANNER_SUCCESS",
        payload: null,
      });

      try {
        const response = await fetch(
          `${BASE_URL}${API_ENDPOINTS.CROP_RECOMMENDATION}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              nitrogen: Number(state.formData.nitrogen),
              phosphorus: Number(state.formData.phosphorus),
              potassium: Number(state.formData.potassium),
              temperature: Number(state.formData.temperature),
              humidity: Number(state.formData.humidity),
              ph: Number(state.formData.ph),
              rainfall: Number(state.formData.rainfall),
            }),
          }
        );

        if (!response.ok) {
          throw new Error(`Server Error : ${response.status}`);
        }

        const data = await response.json();

        dispatch({
          type: "SET_RESULT",
          payload: data.crop,
        });

        toast.success("Crop recommendation generated successfully.");
      } catch (error) {
        console.error(error);

        toast.error(
          error.message || "Failed to get crop recommendation."
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

  // ================= Crop Planner =================

  const handleCropPlanner = useCallback(async () => {
    if (!state.recommendedCrop) {
      toast.warning("Please generate crop recommendation first.");
      return;
    }

    dispatch({
      type: "PLANNER_REQUEST",
    });

    try {
      const token = localStorage.getItem("token");

      const planner = await getCropPlanner(
        state.recommendedCrop,
        token
      );

      dispatch({
        type: "PLANNER_SUCCESS",
        payload: planner,
      });

      toast.success("Crop planner generated successfully.");
    } catch (error) {
      console.error("Crop Planner Error :", error);

      dispatch({
        type: "PLANNER_FAILURE",
        payload:
          error.response?.data?.message ||
          error.message,
      });

      toast.error(
        error.response?.data?.message ||
          "Failed to generate crop planner."
      );
    }
  }, [state.recommendedCrop]);

  // ================= Reset =================

  const handleReset = useCallback(() => {
    dispatch({
      type: "RESET",
    });
  }, []);

  return {
    state,
    dispatch,
    handleSubmit,
    handleCropPlanner,
    handleReset,
  };
};