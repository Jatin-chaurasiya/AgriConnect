import { useReducer, useEffect, useCallback } from "react";
import { schemesReducer, initialState } from "../reducers/schemesReducer";
import { BASE_URL, API_ENDPOINTS } from "../Util/apiEndPoints";

export const useGovernmentSchemes = () => {
  const [state, dispatch] = useReducer(schemesReducer, initialState);

  // Initial fetch - sab schemes
  useEffect(() => {
    fetchSchemes({});
  }, []);

  const fetchSchemes = async (filters) => {
    try {
      const params = new URLSearchParams();

      if (filters.schemeType) params.append("type", filters.schemeType);
      if (filters.state) params.append("state", filters.state);
      if (filters.category) params.append("category", filters.category);

      const url = `${BASE_URL}${API_ENDPOINTS.SCHEMES}?${params.toString()}`;
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