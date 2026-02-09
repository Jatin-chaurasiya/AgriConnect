import React from "react";
import image4 from "../assets/images/image4.jpg";
import image3 from "../assets/images/images3.jpg";
import image2 from "../assets/images/images2.jpg";
import image1 from "../assets/images/images1.jpg";

const ImageCarousel = () => {
  const slides = [
    {
      image: image4,
      title: "Empowering Indian Farmers",
      description:
        "Access technology, markets, and knowledge to maximize your agricultural potential",
    },
    {
      image: image3,
      title: "Smart Farming Solutions",
      description:
        "Leverage AI and technology for better crop yield and sustainable farming",
    },
    {
      image: image2,
      title: "Market Access & Fair Prices",
      description:
        "Connect directly with buyers and get the best prices for your produce",
    },
    {
      image: image1,
      title: "Government Scheme Awareness",
      description:
        "Stay informed about subsidies, schemes, and support programs",
    },
  ];
  return (
    <div id="farmerCarousel" className="carousel slide" data-bs-ride="carousel" data-bs-interval="3000" data-bs-pause="hover">
      {/* Indicators */}
      <div className="carousel-indicators">
        {slides.map((_, index) => (
          <button
            key={index}
            type="button"
            data-bs-target="#farmerCarousel"
            data-bs-slide-to={index}
            className={index === 0 ? "active" : ""}
            aria-current={index === 0 ? "true" : "false"}
            aria-label={`Slide ${index + 1}`}
          ></button>
        ))}
      </div>

      {/* Carousel Items */}
      <div className="carousel-inner">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`carousel-item ${index === 0 ? "active" : ""} text-white`}
            style={{
              background: `url('${slide.image}') center/cover no-repeat`,
              height: "450px",
            }}
          >
            <div className="carousel-caption d-flex flex-column justify-content-center h-100">
              <h2 className="fw-bold">{slide.title}</h2>
              <p>{slide.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Controls */}
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#farmerCarousel"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#farmerCarousel"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
};

export default ImageCarousel;
