import React from "react";
import Swal from "sweetalert2";

const BookingCard = ({ booking, mode, onAccept, onReject, onComplete }) => {
  const handleAccept = () => {
    Swal.fire({
      title: "Accept Booking?",
      text: "Do you want to accept this booking request?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#198754",
      cancelButtonColor: "#6c757d",
      confirmButtonText: "Accept",
    }).then((result) => {
      if (result.isConfirmed) {
        onAccept(booking.bookingId);
      }
    });
  };

  const handleReject = async () => {
    const { value: reason } = await Swal.fire({
      title: "Reject Booking Request",
      input: "textarea",
      inputLabel: "Rejection Reason",
      inputPlaceholder: "Enter rejection reason...",
      showCancelButton: true,
      confirmButtonText: "Reject",
      confirmButtonColor: "#dc3545",
      cancelButtonColor: "#6c757d",
      inputValidator: (value) => {
        if (!value || value.trim() === "") {
          return "Please enter rejection reason.";
        }
      },
    });

    if (reason) {
      onReject(booking.bookingId, reason);
    }
  };

  const handleComplete = () => {
    Swal.fire({
      title: "Complete Booking?",
      text: "Mark this booking as completed?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#0d6efd",
      cancelButtonColor: "#6c757d",
      confirmButtonText: "Complete",
    }).then((result) => {
      if (result.isConfirmed) {
        onComplete(booking.bookingId);
      }
    });
  };

  return (
    <div className="card shadow-sm border-0 mb-4">
      <div className="card-header bg-success text-white">
        <h5 className="mb-0 fw-bold">🚜 {booking.serviceName}</h5>
      </div>

      <div className="card-body">
        <div className="row">
          <div className="col-md-6 mb-2">
            <strong>Farmer :</strong> {booking.farmerName}
          </div>

          <div className="col-md-6 mb-2">
            <strong>Mobile :</strong> {booking.mobile}
          </div>

          <div className="col-md-6 mb-2">
            <strong>Village :</strong> {booking.village}
          </div>

          <div className="col-md-6 mb-2">
            <strong>Address :</strong> {booking.address}
          </div>

          <div className="col-md-6 mb-2">
            <strong>District :</strong> {booking.district}
          </div>

          <div className="col-md-6 mb-2">
            <strong>Price :</strong> ₹{booking.price} / {booking.unit}
          </div>

          <div className="col-md-6 mb-2">
            <strong>Booking Date :</strong> {booking.bookingDate}
          </div>

          <div className="col-md-6 mb-2">
            <strong>Booking Time :</strong> {booking.bookingTime}
          </div>

          <div className="col-md-6 mb-2">
            <strong>Payment :</strong>{" "}
            <span
              className={`badge ${
                booking.paymentStatus === "SUCCESS" ? "bg-success" : "bg-danger"
              }`}
            >
              {booking.paymentStatus}
            </span>
          </div>

          <div className="col-md-6 mb-2">
            <strong>Status :</strong>{" "}
            <span
              className={`badge ${
                booking.status === "PENDING"
                  ? "bg-warning text-dark"
                  : booking.status === "ACCEPTED"
                    ? "bg-primary"
                    : booking.status === "COMPLETED"
                      ? "bg-success"
                      : "bg-danger"
              }`}
            >
              {booking.status}
            </span>
          </div>

          {booking.rejectionReason && (
            <div className="col-12 mt-3">
              <strong>Rejection Reason</strong>

              <div className="alert alert-danger mt-2 mb-0">
                {booking.rejectionReason}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="card-footer bg-white d-flex justify-content-end">
        {mode === "request" && (
          <div className="card-footer bg-white">
            {booking.status === "PENDING" && (
              <div className="d-flex gap-2">
                <button className="btn btn-success" onClick={handleAccept}>
                  ✔ Accept
                </button>

                <button className="btn btn-danger" onClick={handleReject}>
                  ✖ Reject
                </button>
              </div>
            )}

            {booking.status === "ACCEPTED" && (
              <button
                className="btn btn-primary w-100"
                onClick={handleComplete}
              >
                ✓ Complete Service
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingCard;
