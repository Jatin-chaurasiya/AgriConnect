import React, { useState } from "react";
import toast from "react-hot-toast";
import { createOrder, verifyPayment } from "../Hooks/bookingApi";

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

  const handleBooking = async () => {
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

    try {
      const order = await createOrder(service.id);

      const options = {
        key: order.key,

        amount: order.amount,

        currency: order.currency,

        name: "AgriConnect",

        description: service.serviceName,

        order_id: order.orderId,

        handler: async function (response) {
          try {
            await verifyPayment({
              serviceId: service.id,
              razorpayOrderId: response.razorpay_order_id,
              razorpayPaymentId: response.razorpay_payment_id,
              razorpaySignature: response.razorpay_signature,
              farmerName: booking.farmerName,
              mobile: booking.mobile,
              village: booking.village,
              address: booking.address,
              bookingDate: booking.bookingDate,
              bookingTime: booking.bookingTime,
              note: booking.note,
            });
            toast.success("Booking Created Successfully");
            handleClose();
          } catch (error) {
            console.error(error);
            toast.error("Payment Verification Failed");
          }
        },

        prefill: {
          name: booking.farmerName,

          contact: booking.mobile,
        },

        theme: {
          color: "#2D5016",
        },
      };

      const razorpay = new window.Razorpay(options);

      razorpay.open();
    } catch (error) {
      console.error(error);

      toast.error("Payment Failed");
    }
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
                Book {service.serviceName || service.title}
              </h4>

              <button
                className="btn-close btn-close-white"
                onClick={handleClose}
              ></button>
            </div>

            {/* Body */}

            <div className="modal-body">
              <div className="alert alert-success">
                <strong>Selected Service :</strong>{" "}
                {service.serviceName || service.title}
                <br />
                <strong>Provider :</strong>{" "}
                {service.providerName || service.provider}
                <br />
                <strong>Price :</strong> ₹{service.price} / {service.unit}
              </div>

              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label">Farmer Name</label>

                  <input
                    type="text"
                    className="form-control"
                    name="farmerName"
                    value={booking.farmerName}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <label className="form-label">Mobile</label>

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
                  <label className="form-label">Village</label>

                  <input
                    type="text"
                    className="form-control"
                    name="village"
                    value={booking.village}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <label className="form-label">Address</label>

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
                  <label className="form-label">Booking Date</label>

                  <input
                    type="date"
                    className="form-control"
                    name="bookingDate"
                    value={booking.bookingDate}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <label className="form-label">Booking Time</label>

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
                <label className="form-label">Special Instructions</label>

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
                ₹{service.price} / {service.unit}
              </h5>

              <div>
                <button
                  className="btn btn-secondary me-2"
                  onClick={handleClose}
                >
                  Cancel
                </button>

                <button className="btn btn-success" onClick={handleBooking}>
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
