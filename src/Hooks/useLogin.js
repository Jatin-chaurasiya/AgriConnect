import { useReducer, useCallback, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { loginReducer, initialState } from "../reducers/loginReducer";
import { BASE_URL, API_ENDPOINTS } from "../Util/apiEndPoints";
import { AppContext } from "../Context/AppContext";

export const useLogin = () => {
  const { setUser } = useContext(AppContext);

  const [state, dispatch] = useReducer(loginReducer, initialState);

  const navigate = useNavigate();
  const location = useLocation();

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

      let role = "FARMER";
      if (location.pathname === "/login/provider") {
        role = "PROVIDER";
      } else if (location.pathname === "/login/admin") {
        role = "ADMIN";
      }

      try {
        const response = await fetch(`${BASE_URL}${API_ENDPOINTS.LOGIN}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: state.email,
            password: state.password,
            role: role,
          }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData?.message || "Invalid credentials");
        }

        const data = await response.json();

        // Save Login Data
        localStorage.setItem("token", data.token);
        localStorage.setItem("role", data.role);

        // Header ke liye user set karo
        setUser({
          username: data.username,
          role: data.role,
        });
        switch (data.role) {
          case "FARMER":
            navigate("/profile");
            break;

          case "PROVIDER":
            navigate("/profile");
            break;

          case "ADMIN":
            navigate("/profile");
            break;

          default:
            navigate("/");
        }
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
    [state.email, state.password, navigate, setUser],
  );

  return {
    state,
    handleChange,
    handleSubmit,
  };
};
