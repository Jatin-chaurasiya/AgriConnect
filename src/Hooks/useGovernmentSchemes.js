import { useReducer, useCallback, useState } from "react";
import { schemesReducer, initialState } from "../reducers/schemesReducer";
import { BASE_URL, API_ENDPOINTS } from "../Util/apiEndPoints";

export const useGovernmentSchemes = () => {
  const [state, dispatch] = useReducer(schemesReducer, initialState);
  const [hasSearched, setHasSearched] = useState(false);

  const fetchSchemes = async (filters = {}) => {
    try {
      const params = new URLSearchParams();

      if (filters.schemeType && filters.schemeType !== "SELECT")
        params.append("type", filters.schemeType);

      if (filters.state && filters.state !== "SELECT")
        params.append("state", filters.state);

      if (filters.category && filters.category !== "SELECT")
        params.append("category", filters.category);

      const url =
        params.toString().length > 0
          ? `${BASE_URL}${API_ENDPOINTS.SCHEMES}?${params.toString()}`
          : `${BASE_URL}${API_ENDPOINTS.SCHEMES}`;

      const res = await fetch(url);
      const data = await res.json();

      dispatch({ type: "SET_SCHEMES", payload: data });
      setHasSearched(true);
    } catch (err) {
      console.error("Error fetching schemes:", err);
    }
  };

  const applyFilters = useCallback(() => {
    const { schemeType, state: userState, category } = state.filters;

    const noFilterSelected =
      (schemeType === "SELECT" || schemeType === "") &&
      (userState === "SELECT" || userState === "") &&
      (category === "SELECT" || category === "");

    if (noFilterSelected) {
      setHasSearched(false);
      return { error: "NO_FILTER" };
    }

    fetchSchemes(state.filters);
    return { success: true };
  }, [state.filters]);

  // ✅ RESET
  const resetFilters = () => {
    dispatch({ type: "RESET_FILTERS" });
    setHasSearched(false);
  };

  return { state, dispatch, applyFilters, hasSearched, resetFilters };
};