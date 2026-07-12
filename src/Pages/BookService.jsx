import React, { useEffect, useState } from "react";

import ServiceCard from "../Components/ServiceCard";
import ServiceDetailsModal from "../Components/ServiceDetailsModal";
import BookingModal from "../Components/BookingModal";

import useFarmerService from "../Hooks/useFarmerService";

const BookService = () => {
  const {
    services,
    loading,
    Page,
    totalPages,
    fetchServices,
    fetchServiceById,
    selectedService,
  } = useFarmerService();

  const [showModal, setShowModal] = useState(false);
  const [showBookingModal, setShowBookingModal] = useState(false);

  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    fetchServices(currentPage, 3, search);
  }, [currentPage]);

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearch(value);
    setCurrentPage(0);
    fetchServices(0, 3, value);
  };

  const openModal = async (service) => {
    await fetchServiceById(service.id);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const openBookingModal = () => {
    setShowModal(false);
    setShowBookingModal(true);
  };

  const closeBookingModal = () => {
    setShowBookingModal(false);
  };

  return (
    <>
      {/* Hero Section */}

      <section className="py-5" style={{ backgroundColor: "#2D5016" }}>
        <div className="container text-center text-white">
          <h1 className="display-4 fw-bold">
            Book Agricultural Services
          </h1>

          <p className="lead mt-3 mb-4">
            Find trusted agricultural service providers near you and book
            services easily.
          </p>

          <div className="mx-auto" style={{ maxWidth: "500px" }}>
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Search Service..."
              value={search}
              onChange={handleSearch}
            />
          </div>
        </div>
      </section>

      {/* Services */}

      <div className="container py-5">
        <h2 className="section-title">
          Available Agricultural Services
        </h2>

        {loading ? (
          <div className="text-center py-5">
            <h5>Loading...</h5>
          </div>
        ) : (
          <div className="row">
            {services.map((service) => (
              <div
                className="col-lg-4 col-md-6 mb-4"
                key={service.id}
              >
                <ServiceCard
                  service={service}
                  mode="book"
                  onViewDetails={openModal}
                />
              </div>
            ))}
          </div>
        )}

        {/* Pagination */}

        <div className="d-flex justify-content-center mt-4">
          <button
            className="btn btn-outline-success me-2"
            disabled={currentPage === 0}
            onClick={() => setCurrentPage((prev) => prev - 1)}
          >
            Previous
          </button>

          <span className="align-self-center">
            Page {Page + 1} of {totalPages}
          </span>

          <button
            className="btn btn-outline-success ms-2"
            disabled={currentPage + 1 >= totalPages}
            onClick={() => setCurrentPage((prev) => prev + 1)}
          >
            Next
          </button>
        </div>
      </div>

      <ServiceDetailsModal
        show={showModal}
        handleClose={closeModal}
        service={selectedService}
        openBookingModal={openBookingModal}
      />

      <BookingModal
        show={showBookingModal}
        handleClose={closeBookingModal}
        service={selectedService}
      />
    </>
  );
};

export default BookService;