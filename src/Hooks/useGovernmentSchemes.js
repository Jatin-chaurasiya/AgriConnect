import { useReducer, useEffect, useCallback } from "react";
import { schemesReducer, initialState } from "../reducers/schemesReducer";

export const useGovernmentSchemes = () => {
  const [state, dispatch] = useReducer(
    schemesReducer,
    initialState
  );

  // Fetch schemes from Spring Boot backend
  useEffect(() => {
    const fetchSchemes = async () => {
      try {
        const res = await fetch(
          "http://localhost:8080/api/schemes"
        );
        const data = await res.json();

        dispatch({ type: "SET_SCHEMES", payload: data });
      } catch (err) {
        console.error("Error fetching schemes:", err);
      }
    };

    fetchSchemes();
  }, []);

  const applyFilters = useCallback(() => {
    let filtered = state.schemes;

    if (state.filters.schemeType) {
      filtered = filtered.filter(
        (s) =>
          s.schemeType.toLowerCase() ===
          state.filters.schemeType.toLowerCase()
      );
    }

    if (state.filters.state && state.filters.state !== "all") {
      filtered = filtered.filter(
        (s) =>
          s.state === "all" ||
          s.state === state.filters.state
      );
    }

    if (state.filters.category) {
      filtered = filtered.filter(
        (s) =>
          s.category === "general" ||
          s.category === state.filters.category
      );
    }

    dispatch({ type: "SET_FILTERED", payload: filtered });
  }, [state.filters, state.schemes]);

  return {
    state,
    dispatch,
    applyFilters,
  };
};
