import { useReducer, useCallback } from "react";
import { schemesReducer, initialState } from "../reducers/schemesReducer";
import { BASE_URL, API_ENDPOINTS } from "../Util/apiEndPoints";

export const useGovernmentSchemes = () => {
  const [state, dispatch] = useReducer(schemesReducer, initialState);

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
          : `${BASE_URL}${API_ENDPOINTS.SCHEMES}`; // no filter = all data

      const res = await fetch(url);
      const data = await res.json();

      dispatch({ type: "SET_SCHEMES", payload: data });
    } catch (err) {
      console.error("Error fetching schemes:", err);
    }
  };

  const applyFilters = useCallback(() => {
    fetchSchemes(state.filters);
  }, [state.filters]);

  return { state, dispatch, applyFilters };
};