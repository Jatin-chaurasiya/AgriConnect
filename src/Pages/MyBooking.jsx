import React, { useMemo, useState } from "react";
import ServiceCard from "../Components/ServiceCard";
import toast from "react-hot-toast";

import tractor from "../assets/images/tractor.jpg";
import spraying from "../assets/images/cropspraying.jpg";
import soil from "../assets/images/soiltesting.jpg";

const MyBooking = () => {
  const bookings = [
    {
      id: 1,
      image: tractor,
      title: "Tractor Rental",
      provider: "Rajesh Agriculture Services",
      district: "Lucknow",
      bookingDate: "10 July 2026",
      bookingTime: "10:30 AM",
      price: "₹1200 / Hour",
      status: "Pending",
    },
    {
      id: 2,
      image: spraying,
      title: "Crop Spraying",
      provider: "Green Farm Services",
      district: "Kanpur",
      bookingDate: "14 July 2026",
      bookingTime: "09:00 AM",
      price: "₹700 / Acre",
      status: "Approved",
    },
    {
      id: 3,
      image: soil,
      title: "Soil Testing",
      provider: "Agri Soil Lab",
      district: "Prayagraj",
      bookingDate: "18 July 2026",
      bookingTime: "11:00 AM",
      price: "₹500 / Sample",
      status: "Completed",
    },
  ];

  const [search, setSearch] = useState("");

  const [status, setStatus] = useState("All");
  const cancelBooking = (booking) => {
  const confirmCancel = window.confirm(
    `Cancel "${booking.title}" booking?`
  );

  if (confirmCancel) {
    toast.success("Booking Cancelled Successfully");
  }
}; 

  const filteredBookings = useMemo(() => {
    return bookings.filter((booking) => {
      const matchSearch = booking.title
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchStatus = status === "All" || booking.status === status;

      return matchSearch && matchStatus;
    });
  }, [search, status]);

  const getBadge = (status) => {
    switch (status) {
      case "Pending":
        return "bg-warning text-dark";

      case "Approved":
        return "bg-primary";

      case "Completed":
        return "bg-success";

      case "Cancelled":
        return "bg-danger";

      default:
        return "bg-secondary";
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
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="col-lg-4">
            <select
              className="form-select form-select-lg"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option>All</option>

              <option>Pending</option>

              <option>Approved</option>

              <option>Completed</option>

              <option>Cancelled</option>
            </select>
          </div>
        </div>

        <div className="row">
          {filteredBookings.map((booking) => (
            <div className="col-lg-4 col-md-6 mb-4" key={booking.id}>
              <ServiceCard
                service={booking}
                mode="booking"
                showImage={false}
                showCategory={false}
                showDescription={false}
                showExperience={false}
                onCancelBooking={cancelBooking}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default MyBooking;
