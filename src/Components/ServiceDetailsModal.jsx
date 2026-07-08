import React from "react";

const ServiceDetailsModal = ({
  show,
  handleClose,
  service,
  openBookingModal,
}) => {
  if (!show || !service) return null;

  return (
    <>
      <div
        className="modal fade show"
        style={{
          display: "block",
          backgroundColor: "rgba(0,0,0,0.6)",
        }}
      >
        <div className="modal-dialog modal-lg modal-dialog-centered">
          <div className="modal-content">
            {/* Header */}

            <div
              className="modal-header"
              style={{
                background: "#2D5016",
                color: "white",
              }}
            >
              <h4 className="modal-title">{service.title}</h4>

              <button
                className="btn-close btn-close-white"
                onClick={handleClose}
              ></button>
            </div>

            {/* Body */}

            <div className="modal-body">
              <div className="row">
                {/* Image */}

                <div className="col-md-5">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="img-fluid rounded shadow"
                    style={{
                      height: "300px",
                      width: "100%",
                      objectFit: "cover",
                    }}
                  />
                </div>

                {/* Details */}

                <div className="col-md-7">
                  <span className="badge bg-success mb-3">
                    {service.category}
                  </span>

                  <h3 className="fw-bold">{service.title}</h3>

                  <div className="mb-3">
                    ⭐⭐⭐⭐⭐
                    <small className="text-muted ms-2">4.8 (150 Reviews)</small>
                  </div>

                  <p>{service.description}</p>

                  <hr />

                  <p>
                    <strong>Provider :</strong> {service.provider}
                  </p>

                  <p>
                    <strong>District :</strong> {service.district}
                  </p>

                  <p>
                    <strong>Experience :</strong> {service.experience}
                  </p>

                  <p>
                    <strong>Availability :</strong>
                    Available Today
                  </p>

                  <h3 className="text-success fw-bold">{service.price}</h3>
                </div>
              </div>

              <hr />

              {/* Extra Information */}

              <div className="mt-3">
                <h5 className="fw-bold">Service Includes</h5>

                <ul>
                  <li>Experienced Service Provider</li>

                  <li>Modern Equipment</li>

                  <li>On-time Service</li>

                  <li>Safety Guidelines Followed</li>

                  <li>Customer Support</li>
                </ul>
              </div>
            </div>

            {/* Footer */}

            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={handleClose}>
                Close
              </button>
              <button className="btn btn-success" onClick={openBookingModal}>
                Book Service
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ServiceDetailsModal;
