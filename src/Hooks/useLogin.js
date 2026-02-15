import { useReducer, useCallback, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { loginReducer, initialState } from "../reducers/loginReducer";
import { BASE_URL, API_ENDPOINTS } from "../Util/apiEndpoints";
import { AppContext } from "../Context/AppContext";

export const useLogin = () => {

  const { setUser } = useContext(AppContext);

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
      // 🔐 LOGIN
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

      localStorage.setItem("token", data.token);

      const profileRes = await fetch(
        `${BASE_URL}${API_ENDPOINTS.PROFILE}`,
        {
          headers: {
            Authorization: `Bearer ${data.token}`,
          },
        }
      );

      if (!profileRes.ok) {
        throw new Error("Failed to fetch profile");
      }

      const profileData = await profileRes.json();

      setUser(profileData);

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
  };
};
