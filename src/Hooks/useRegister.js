import { useReducer, useCallback } from "react";
import { registerReducer, initialState } from "../reducers/registerReducer";
import uploadProfileImage from "../Util/uploadProfileImage";
import { BASE_URL, API_ENDPOINTS } from "../Util/apiEndpoints";

export const useRegister = () => {
  const [state, dispatch] = useReducer(
    registerReducer,
    initialState
  );

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "profileImage") {
      const file = files?.[0];

      if (file) {
        dispatch({
          type: "SET_IMAGE",
          payload: {
            file,
            preview: URL.createObjectURL(file),
          },
        });
      }
    } else {
      dispatch({
        type: "UPDATE_FIELD",
        field: name,
        value,
      });
    }
  };

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();

      dispatch({ type: "SET_LOADING", payload: true });
      dispatch({ type: "SET_ERROR", payload: null });

      try {
        let imageUrl = null;

        // Upload image to Cloudinary first
        if (state.profileImage) {
          imageUrl = await uploadProfileImage(
            state.profileImage
          );
        }

        const payload = {
          username: state.username,
          email: state.email,
          password: state.password,
          language: state.language,
          role: state.serviceProvider === "Yes" ? "SERVICE_PROVIDER" : "USER",
          profileImageUrl: imageUrl,
        };

        const response = await fetch(
          `${BASE_URL}${API_ENDPOINTS.REGISTER}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
          }
        );

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(
            errorData?.message || "Registration failed"
          );
        }

        const data = await response.json();
        console.log("Register success:", data);

        dispatch({ type: "RESET" });

      } catch (err) {
        console.error(err);
        dispatch({
          type: "SET_ERROR",
          payload: err.message || "Registration failed. Try again.",
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
