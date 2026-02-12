import { useReducer, useCallback } from "react";
import { registerReducer, initialState } from "../reducers/registerReducer";

export const useRegister = () => {
  const [state, dispatch] = useReducer(
    registerReducer,
    initialState
  );

  const handleChange = (e) => {
    dispatch({
      type: "UPDATE_FIELD",
      field: e.target.name,
      value: e.target.value,
    });
  };

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();

      dispatch({ type: "SET_LOADING", payload: true });
      dispatch({ type: "SET_ERROR", payload: null });

      try {
        const response = await fetch(
          "http://localhost:8080/doRegister",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(state),
          }
        );

        if (!response.ok)
          throw new Error("Registration failed");

        const data = await response.json();
        console.log("Register success:", data);

      } catch (err) {
        dispatch({
          type: "SET_ERROR",
          payload: "Registration failed. Try again.",
        });
      } finally {
        dispatch({
          type: "SET_LOADING",
          payload: false,
        });
      }
    },
    [state]
  );

  return {
    state,
    handleChange,
    handleSubmit,
  };
};
