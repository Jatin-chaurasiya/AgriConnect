import { useEffect, useReducer } from "react";
import toast from "react-hot-toast";

import bookingReducer, { initialState } from "../reducers/bookingReducer";

import {
  getProviderBookingRequests,
  acceptBooking as acceptBookingApi,
  rejectBooking as rejectBookingApi,
  completeBooking as completeBookingApi,
} from "./bookingApi";

const useBookingRequests = () => {
  const [state, dispatch] = useReducer(bookingReducer, initialState);

  const fetchBookingRequests = async (
    page = state.page
  ) => {

    dispatch({
      type: "FETCH_PROVIDER_BOOKINGS_REQUEST",
    });

    try {

      const response = await getProviderBookingRequests(
        page,
        state.size
      );

      dispatch({
        type: "FETCH_PROVIDER_BOOKINGS_SUCCESS",
        payload: response,
      });

    } catch (error) {

      dispatch({
        type: "FETCH_PROVIDER_BOOKINGS_FAILURE",
        payload: error.message,
      });

      toast.error("Failed to load booking requests");
    }
  };

  const acceptBooking = async (bookingId) => {

    try {

      await acceptBookingApi(bookingId);

      dispatch({
        type: "ACCEPT_BOOKING_SUCCESS",
        payload: bookingId,
      });

      toast.success("Booking accepted successfully");

      fetchBookingRequests();

    } catch (error) {

      toast.error(
        error.response?.data?.message ||
        "Failed to accept booking"
      );

    }

  };

  const rejectBooking = async (
    bookingId,
    reason
  ) => {

    try {

      await rejectBookingApi(
        bookingId,
        reason
      );

      dispatch({
        type: "REJECT_BOOKING_SUCCESS",
        payload: {
          id: bookingId,
          reason,
        },
      });

      toast.success("Booking rejected successfully");

      fetchBookingRequests();

    } catch (error) {

      toast.error(
        error.response?.data?.message ||
        "Failed to reject booking"
      );

    }

  };

  const completeBooking = async (
    bookingId
  ) => {

    try {

      await completeBookingApi(
        bookingId
      );

      dispatch({
        type: "COMPLETE_BOOKING_SUCCESS",
        payload: bookingId,
      });

      toast.success("Booking completed successfully");

      fetchBookingRequests();

    } catch (error) {

      toast.error(
        error.response?.data?.message ||
        "Failed to complete booking"
      );

    }

  };

  const setPage = (page) => {

    dispatch({
      type: "SET_PAGE",
      payload: page,
    });

  };

  useEffect(() => {

    fetchBookingRequests(state.page);

  }, [state.page]);

  return {

    state,

    fetchBookingRequests,

    acceptBooking,

    rejectBooking,

    completeBooking,

    setPage,

  };

};

export default useBookingRequests;