import { useEffect, useReducer } from "react";
import toast from "react-hot-toast";

import bookingReducer, { initialState } from "../reducers/bookingReducer";

import { getMyBookings, cancelBooking as cancelBookingApi } from "./bookingApi";

const useMyBooking = () => {
  const [state, dispatch] = useReducer(bookingReducer, initialState);

  const fetchBookings = async (page = state.page, keyword = state.keyword) => {
    dispatch({
      type: "FETCH_BOOKINGS_REQUEST",
    });

    try {
      const response = await getMyBookings(page, state.size, keyword);

      dispatch({
        type: "FETCH_BOOKINGS_SUCCESS",
        payload: response,
      });
    } catch (error) {
      dispatch({
        type: "FETCH_BOOKINGS_FAILURE",
        payload: error.message,
      });

      toast.error("Failed to load bookings");
    }
  };
  const cancelBooking = async (bookingId) => {
    try {
      await cancelBookingApi(bookingId);

      toast.success("Booking Cancelled Successfully");

      fetchBookings();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to cancel booking");
    }
  };
  const setKeyword = (keyword) => {
    dispatch({
      type: "SET_KEYWORD",
      payload: keyword,
    });
  };

  const setStatus = (status) => {
    dispatch({
      type: "SET_STATUS",
      payload: status,
    });
  };

  const setPage = (page) => {
    dispatch({
      type: "SET_PAGE",
      payload: page,
    });
  };

  useEffect(() => {
    fetchBookings(state.page, state.keyword);
  }, [state.page, state.keyword]);

  return {
    state,
    fetchBookings,
    setKeyword,
    setStatus,
    setPage,
    cancelBooking,
  };
};

export default useMyBooking;
