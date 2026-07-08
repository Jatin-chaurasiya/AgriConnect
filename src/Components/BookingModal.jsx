import React, { useState } from "react";
import toast from "react-hot-toast";


const BookingModal = ({ show, handleClose, service }) => {

  const [booking, setBooking] = useState({
    farmerName: "",
    mobile: "",
    village: "",
    address: "",
    bookingDate: "",
    bookingTime: "",
    note: "",
  });

  if (!show || !service) return null;

  const handleChange = (e) => {
    setBooking({
      ...booking,
      [e.target.name]: e.target.value,
    });
  };

  const handleBooking = () => {

    if (
      !booking.farmerName ||
      !booking.mobile ||
      !booking.village ||
      !booking.address ||
      !booking.bookingDate ||
      !booking.bookingTime
    ) {
      alert("Please fill all required fields.");
      return;
    }

    // Dummy Booking

    const newBooking = {
      id: Date.now(),
      serviceName: service.title,
      provider: service.provider,
      district: service.district,
      price: service.price,
      status: "Pending",
      ...booking,
    };

   toast.success("Payment Successful! Booking Created Successfully.");

    handleClose();
  };

  return (
    <>
      <div
        className="modal fade show"
        style={{
          display: "block",
          background: "rgba(0,0,0,.6)",
        }}
      >
        <div className="modal-dialog modal-lg modal-dialog-centered">

          <div className="modal-content">

            {/* Header */}

            <div
              className="modal-header text-white"
              style={{ background: "#2D5016" }}
            >
              <h4 className="modal-title">
                Book {service.title}
              </h4>

              <button
                className="btn-close btn-close-white"
                onClick={handleClose}
              ></button>
            </div>

            {/* Body */}

            <div className="modal-body">

              <div className="alert alert-success">

                <strong>Selected Service :</strong>

                {" "}

                {service.title}

                <br />

                <strong>Provider :</strong>

                {" "}

                {service.provider}

                <br />

                <strong>Price :</strong>

                {" "}

                {service.price}

              </div>

              <div className="row">

                <div className="col-md-6 mb-3">

                  <label className="form-label">

                    Farmer Name

                  </label>

                  <input
                    type="text"
                    className="form-control"
                    name="farmerName"
                    value={booking.farmerName}
                    onChange={handleChange}
                  />

                </div>

                <div className="col-md-6 mb-3">

                  <label className="form-label">

                    Mobile

                  </label>

                  <input
                    type="text"
                    className="form-control"
                    name="mobile"
                    value={booking.mobile}
                    onChange={handleChange}
                  />

                </div>

              </div>

              <div className="row">

                <div className="col-md-6 mb-3">

                  <label className="form-label">

                    Village

                  </label>

                  <input
                    type="text"
                    className="form-control"
                    name="village"
                    value={booking.village}
                    onChange={handleChange}
                  />

                </div>

                <div className="col-md-6 mb-3">

                  <label className="form-label">

                    Address

                  </label>

                  <input
                    type="text"
                    className="form-control"
                    name="address"
                    value={booking.address}
                    onChange={handleChange}
                  />

                </div>

              </div>

              <div className="row">

                <div className="col-md-6 mb-3">

                  <label className="form-label">

                    Booking Date

                  </label>

                  <input
                    type="date"
                    className="form-control"
                    name="bookingDate"
                    value={booking.bookingDate}
                    onChange={handleChange}
                  />

                </div>

                <div className="col-md-6 mb-3">

                  <label className="form-label">

                    Booking Time

                  </label>

                  <input
                    type="time"
                    className="form-control"
                    name="bookingTime"
                    value={booking.bookingTime}
                    onChange={handleChange}
                  />

                </div>

              </div>

              <div className="mb-3">

                <label className="form-label">

                  Special Instructions

                </label>

                <textarea
                  rows="3"
                  className="form-control"
                  name="note"
                  value={booking.note}
                  onChange={handleChange}
                ></textarea>

              </div>

            </div>

            {/* Footer */}

            <div className="modal-footer justify-content-between">

              <h5 className="text-success fw-bold">

                {service.price}

              </h5>

              <div>

                <button
                  className="btn btn-secondary me-2"
                  onClick={handleClose}
                >
                  Cancel
                </button>

                <button
                  className="btn btn-success"
                  onClick={handleBooking}
                >
                  Proceed Payment
                </button>

              </div>

            </div>

          </div>

        </div>
      </div>
    </>
  );
};

export default BookingModal;