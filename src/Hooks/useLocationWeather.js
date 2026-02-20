import { useReducer, useEffect, useCallback } from "react";
import { weatherReducer, initialState } from "../reducers/weatherReducer";
import statesDataList from "../data/statesData";
import { toast } from "react-toastify";
import { BASE_URL, API_ENDPOINTS } from "../Util/apiEndPoints";

export const useLocationWeather = () => {
  const [state, dispatch] = useReducer(weatherReducer, initialState);

  useEffect(() => {
    dispatch({ type: "SET_STATES", payload: statesDataList });
  }, []);

  const handleStateChange = useCallback(
    (stateName) => {
      const stateObj = state.statesData.find((s) => s.name === stateName);
      dispatch({
        type: "SET_STATE",
        payload: stateName,
        cities: stateObj?.cities || [],
      });
    },
    [state.statesData],
  );

  const fetchWeather = useCallback(
    async (e) => {
      e.preventDefault();

      if (!state.selectedState || !state.selectedCity) {
        toast.error("Please select State and City");
        return;
      }

      dispatch({ type: "SET_LOADING", payload: true });
      dispatch({ type: "SET_WEATHER", payload: null });

      const params = new URLSearchParams({
        state: state.selectedState,
        city: state.selectedCity,
        ...(state.village.trim() && { village: state.village.trim() }),
      });

      try {
        const res = await fetch(
          `${BASE_URL}${API_ENDPOINTS.WEATHER}?${params.toString()}`,
        );

        if (!res.ok) throw new Error("API Error");

        const data = await res.json();
        dispatch({ type: "SET_WEATHER", payload: data });
      } catch (err) {
        toast.error("Failed to fetch weather.");
      } finally {
        dispatch({ type: "SET_LOADING", payload: false });
      }
    },
    [state.selectedState, state.selectedCity, state.village],
  );

  return { state, dispatch, handleStateChange, fetchWeather };
};
