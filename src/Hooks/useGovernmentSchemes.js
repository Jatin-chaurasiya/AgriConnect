import { useReducer, useCallback, useState } from "react";
import { schemesReducer, initialState } from "../reducers/schemesReducer";
import { BASE_URL, API_ENDPOINTS } from "../Util/apiEndPoints";

export const useGovernmentSchemes = () => {
  const [state, dispatch] = useReducer(schemesReducer, initialState);
  const [hasSearched, setHasSearched] = useState(false);

  const applyFilters = useCallback(async () => {
    const { schemeType, state: userState, category } = state.filters;

    const noFilterSelected =
      (schemeType === "SELECT" || schemeType === "") &&
      (userState === "SELECT" || userState === "") &&
      (category === "SELECT" || category === "");

    if (noFilterSelected) {
      setHasSearched(false);
      return { error: "NO_FILTER" };
    }

    try {
      const params = new URLSearchParams();

      if (schemeType && schemeType !== "SELECT")
        params.append("type", schemeType);
      if (userState && userState !== "SELECT")
        params.append("state", userState);
      if (category && category !== "SELECT")
        params.append("category", category);

      const url = params.toString()
        ? `${BASE_URL}${API_ENDPOINTS.SCHEMES}?${params.toString()}`
        : `${BASE_URL}${API_ENDPOINTS.SCHEMES}`;

      const res = await fetch(url);
      const data = await res.json();

      dispatch({ type: "SET_SCHEMES", payload: data });
      setHasSearched(true);
      return { success: true };
    } catch (err) {
      console.error("Error fetching schemes:", err);
      return { error: "FETCH_FAILED" };
    }
  }, [state.filters]);

  const resetFilters = () => {
    dispatch({ type: "RESET_FILTERS" });
    setHasSearched(false);
  };

  return { state, dispatch, applyFilters, hasSearched, resetFilters };
};