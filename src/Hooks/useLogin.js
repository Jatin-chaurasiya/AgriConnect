import { useReducer, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { loginReducer, initialState } from "../reducers/loginReducer";
import { BASE_URL, API_ENDPOINTS } from "../Util/apiEndpoints";

export const useLogin = (setUser) => {
  const [state, dispatch] = useReducer(
    loginReducer,
    initialState
  );

  const navigate = useNavigate();

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
          `${BASE_URL}${API_ENDPOINTS.LOGIN}`,
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

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(
            errorData?.message || "Invalid credentials"
          );
        }

        const data = await response.json();

        // 🔥 Save token
        localStorage.setItem("token", data.token);

        // 🔥 Save user info
        const user = {
          username: data.username,
          role: data.role,
        };

        localStorage.setItem("user", JSON.stringify(user));

        // 🔥 Update global state
        if (setUser) {
          setUser(user);
        }

        // 🔥 Redirect to profile
        navigate("/profile");

      } catch (err) {
        dispatch({
          type: "SET_ERROR",
          payload: err.message || "Invalid email or password",
        });
      } finally {
        dispatch({
          type: "SET_LOADING",
          payload: false,
        });
      }
    },
    [state.email, state.password, navigate, setUser]
  );

  return {
    state,
    handleChange,
    handleSubmit,
    dispatch,
  };
};
