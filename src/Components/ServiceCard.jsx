import React from "react";

const ServiceCard = ({ service, mode, onViewDetails, onCancelBooking }) => {
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
    <div className="card knowledge-card h-100">
      {/* Image */}
      {mode === "book" && (
        <img
          src={service.image || service.imageUrl}
          alt={service.title || service.serviceName}
          className="card-img-top"
          style={{
            height: "220px",
            objectFit: "cover",
          }}
        />
      )}

      <div className="card-body d-flex flex-column">
        {/* Category & Status */}

        <div className="d-flex justify-content-between">
          {mode === "book" && <span className="tag">{service.category}</span>}

          {mode === "booking" && (
            <span className={`badge ${getBadge(service.status)}`}>
              {service.status}
            </span>
          )}
        </div>

        {/* Title */}

        <h4 className="mt-3">{service.title || service.serviceName}</h4>

        {/* Description */}

        {mode === "book" && <p className="text-muted">{service.description}</p>}

        <hr />

        {/* Common */}

        <p className="mb-2">
          <strong>Provider :</strong>{service.provider || service.providerName}
        </p>

        <p className="mb-2">
          <strong>District :</strong> {service.district}
        </p>

        {/* Book Service */}

        {mode === "book" && (
          <>
            <p className="mb-2">
              <strong>Experience :</strong> {service.experience}
            </p>

            <h5 className="text-success fw-bold">₹{service.price} {service.unit ? `/ ${service.unit}` : ""}</h5>
          </>
        )}

        {/* My Booking */}

        {mode === "booking" && (
          <>
            <p className="mb-2">
              <strong>Date :</strong> {service.bookingDate}
            </p>

            <p className="mb-2">
              <strong>Time :</strong> {service.bookingTime}
            </p>

            <h5 className="text-success fw-bold">{service.price}</h5>
          </>
        )}

        {/* Buttons */}

        <div className="mt-auto">
          {mode === "book" && (
            <button
              className="btn btn-success w-100"
              onClick={() => onViewDetails(service)}
            >
              View Details
            </button>
          )}

          {mode === "booking" && service.status === "Pending" && (
            <button
              className="btn btn-outline-danger w-100"
              onClick={() => onCancelBooking(service)}
            >
              Cancel Booking
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
