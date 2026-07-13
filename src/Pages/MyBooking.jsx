import React from "react";
import ServiceCard from "../Components/ServiceCard";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import useMyBooking from "../Hooks/useMyBooking";

const MyBooking = () => {
  const { state, setKeyword, setStatus, setPage, cancelBooking } =
    useMyBooking();
    
  const { bookings, keyword, status, page, totalPages, loading } = state;

  const handleCancelBooking = async (booking) => {
    const result = await Swal.fire({
      title: "Cancel Booking?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, Cancel",
    });

    if (result.isConfirmed) {
      await cancelBooking(booking.bookingId);
    }
  };
  return (
    <>
      {/* Hero */}

      <section className="py-5" style={{ background: "#2D5016" }}>
        <div className="container text-center text-white">
          <h1 className="display-4 fw-bold">My Bookings</h1>

          <p className="lead">Track all your agricultural service bookings.</p>
        </div>
      </section>

      {/* Content */}

      <div className="container py-5">
        <div className="row mb-4">
          <div className="col-lg-8 mb-3">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Search Booking..."
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
            />
          </div>

          <div className="col-lg-4">
            <select
              className="form-select form-select-lg"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="All">All</option>
              <option value="PENDING">Pending</option>
              <option value="ACCEPTED">Accepted</option>
              <option value="COMPLETED">Completed</option>
              <option value="REJECTED">Rejected</option>
            </select>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-5">
            <h5>Loading Bookings...</h5>
          </div>
        ) : (
          <div className="row">
            {bookings
              .filter(
                (booking) => status === "All" || booking.status === status,
              )
              .map((booking) => (
                <div className="col-lg-4 col-md-6 mb-4" key={booking.bookingId}>
                  <ServiceCard
                    service={booking}
                    mode="booking"
                    showImage={false}
                    showCategory={false}
                    showDescription={false}
                    showExperience={false}
                    onCancelBooking={handleCancelBooking}
                  />
                </div>
              ))}
          </div>
        )}

        {totalPages > 0 && (
          <div className="d-flex justify-content-center mt-4">
            <button
              className="btn btn-outline-success me-2"
              disabled={page === 0}
              onClick={() => setPage(page - 1)}
            >
              Previous
            </button>

            <span className="align-self-center">
              Page {page + 1} of {totalPages}
            </span>

            <button
              className="btn btn-outline-success ms-2"
              disabled={page + 1 >= totalPages}
              onClick={() => setPage(page + 1)}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default MyBooking;
