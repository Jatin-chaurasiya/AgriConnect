import React, { useState } from "react";

import ServiceCard from "../Components/ServiceCard";
import ServiceDetailsModal from "../Components/ServiceDetailsModal";
import BookingModal from "../Components/BookingModal";

import tractor from "../assets/images/tractor.jpg";
import spraying from "../assets/images/cropspraying.jpg";
import soil from "../assets/images/soiltesting.jpg";

const BookService = () => {
  const [selectedService, setSelectedService] = useState(null);

  const [showModal, setShowModal] = useState(false);

  const [showBookingModal, setShowBookingModal] = useState(false);

  const [search, setSearch] = useState("");

  const openModal = (service) => {
    setSelectedService(service);
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

  // Dummy Service Data
  const services = [
    {
      id: 1,
      image: tractor,
      category: "Machinery",
      title: "Tractor Rental",
      provider: "Rajesh Agriculture Services",
      district: "Lucknow",
      experience: "8 Years",
      price: "₹1200 / Hour",
      description:
        "Hire modern tractors with experienced operators for ploughing, cultivation and land preparation.",
    },

    {
      id: 2,
      image: spraying,
      category: "Crop Care",
      title: "Crop Spraying",
      provider: "Green Farm Services",
      district: "Kanpur",
      experience: "5 Years",
      price: "₹700 / Acre",
      description:
        "Professional pesticide and fertilizer spraying using advanced spraying machines.",
    },

    {
      id: 3,
      image: soil,
      category: "Testing",
      title: "Soil Testing",
      provider: "Agri Soil Lab",
      district: "Prayagraj",
      experience: "10 Years",
      price: "₹500 / Sample",
      description:
        "Complete soil nutrient analysis with crop recommendation report.",
    },
  ];

  const filteredServices = services.filter((service) =>
    service.title.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <>
      {/* Hero Section */}

      <section className="py-5" style={{ backgroundColor: "#2D5016" }}>
        <div className="container text-center text-white">
          <h1 className="display-4 fw-bold">Book Agricultural Services</h1>

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
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
      </section>

      {/* Services */}

      <div className="container py-5">
        <h2 className="section-title">Available Agricultural Services</h2>

        <div className="row">
          {filteredServices.map((service) => (
            <div className="col-lg-4 col-md-6 mb-4" key={service.id}>
              <ServiceCard
                service={service}
                mode="book"
                onViewDetails={openModal}
              />
            </div>
          ))}
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
