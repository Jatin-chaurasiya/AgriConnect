import { useEffect, useReducer } from "react";
import toast from "react-hot-toast";

import bookingReducer, { initialState } from "../reducers/bookingReducer";

import { getBookingHistory } from "./bookingApi";

const useBookingHistory = () => {

  const [state, dispatch] = useReducer(
    bookingReducer,
    initialState
  );

  const fetchBookingHistory = async (
    page = state.page
  ) => {

    dispatch({
      type: "FETCH_BOOKING_HISTORY_REQUEST",
    });

    try {

      const response = await getBookingHistory(
        page,
        state.size
      );

      dispatch({
        type: "FETCH_BOOKING_HISTORY_SUCCESS",
        payload: response,
      });

    } catch (error) {

      dispatch({
        type: "FETCH_BOOKING_HISTORY_FAILURE",
        payload: error.message,
      });

      toast.error("Failed to load booking history");

    }

  };

  const setPage = (page) => {

    dispatch({
      type: "SET_PAGE",
      payload: page,
    });

  };

  useEffect(() => {

    fetchBookingHistory(state.page);

  }, [state.page]);

  return {

    state,

    fetchBookingHistory,

    setPage,

  };

};

export default useBookingHistory;