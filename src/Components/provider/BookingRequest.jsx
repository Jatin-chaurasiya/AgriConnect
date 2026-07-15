import React from "react";
import { Spinner, Alert, Pagination } from "react-bootstrap";

import useBookingRequests from "../../Hooks/useBookingRequests";
import BookingCard from "./BookingCard";

const BookingRequest = () => {
  const {
    state,
    acceptBooking,
    rejectBooking,
    completeBooking,
    setPage,
  } = useBookingRequests();

const activeBookings = state.providerBookings;

  if (state.loading) {
    return (
      <div className="text-center py-5">
        <Spinner animation="border" variant="success" />
      </div>
    );
  }

  return (
    <div className="container py-4">

      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold">Booking Requests</h2>

        <span className="badge bg-success fs-6">
          {activeBookings.length} Requests
        </span>
      </div>

      {activeBookings.length === 0 ? (
        <Alert variant="info" className="text-center">
          No Booking Requests Found.
        </Alert>
      ) : (
        <>
          {activeBookings.map((booking) => (
            <BookingCard
              key={booking.bookingId}
              booking={booking}
              mode="request"
              onAccept={acceptBooking}
              onReject={rejectBooking}
              onComplete={completeBooking}
            />
          ))}

          {state.totalPages > 1 && (
            <div className="d-flex justify-content-center mt-4">
              <Pagination>

                <Pagination.Prev
                  disabled={state.page === 0}
                  onClick={() => setPage(state.page - 1)}
                />

                {[...Array(state.totalPages)].map((_, index) => (
                  <Pagination.Item
                    key={index}
                    active={state.page === index}
                    onClick={() => setPage(index)}
                  >
                    {index + 1}
                  </Pagination.Item>
                ))}

                <Pagination.Next
                  disabled={state.page === state.totalPages - 1}
                  onClick={() => setPage(state.page + 1)}
                />

              </Pagination>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default BookingRequest;