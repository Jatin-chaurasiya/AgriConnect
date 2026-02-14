import { useReducer, useCallback } from "react";
import { registerReducer, initialState } from "../reducers/registerReducer";
import uploadProfileImage from "../Util/uploadProfileImage";

export const useRegister = () => {
  const [state, dispatch] = useReducer(
    registerReducer,
    initialState
  );

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "profileImage") {
      const file = files[0];

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
          serviceProvider: state.serviceProvider,
          profileImage: imageUrl,
        };

        const response = await fetch(
          "http://localhost:8080/doRegister",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
          }
        );

        if (!response.ok)
          throw new Error("Registration failed");

        const data = await response.json();
        console.log("Register success:", data);

        dispatch({ type: "RESET" });

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
