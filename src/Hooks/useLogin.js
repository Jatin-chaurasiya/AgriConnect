import { useReducer, useCallback } from "react";
import { loginReducer, initialState } from "../reducers/loginReducer";

export const useLogin = () => {
  const [state, dispatch] = useReducer(
    loginReducer,
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
          "http://localhost:8080/doLogin",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: state.email,
              password: state.password,
            }),
          }
        );

        if (!response.ok)
          throw new Error("Invalid credentials");

        const data = await response.json();

        // 🔹 You handle token / redirect here
        console.log("Login success:", data);

      } catch (err) {
        dispatch({
          type: "SET_ERROR",
          payload: "Invalid email or password",
        });
      } finally {
        dispatch({
          type: "SET_LOADING",
          payload: false,
        });
      }
    },
    [state.email, state.password]
  );

  return {
    state,
    handleChange,
    handleSubmit,
    dispatch,
  };
};
