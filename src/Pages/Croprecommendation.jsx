import React from "react";
import { useCropRecommendation } from "../Hooks/useCropRecommendation";

const CropRecommendation = () => {
  const {
    state,
    dispatch,
    handleSubmit,
    handleReset,
  } = useCropRecommendation();

  const { formData, loading, recommendedCrop } =
    state;

  const handleChange = (e) => {
    dispatch({
      type: "UPDATE_FIELD",
      field: e.target.name,
      value: e.target.value,
    });
  };

  return (
    <>
      {/* SAME HERO SECTION */}
      <section
        className="hero-section"
        style={{ backgroundColor: "#2D5016" }}
      >
        <div className="container text-center">
          <h1 className="display-4 fw-bold mb-3 text-white">
            AI-Powered Crop Recommendation
          </h1>
          <p className="lead mb-4 text-white">
            Get personalized crop suggestions based on your soil, climate, and farming conditions
          </p>
        </div>
      </section>

      <div className="container my-5">
        <div className="recommendation-form">
          <h2 className="mb-4 text-center">
            Tell Us About Your Farm
          </h2>

          <form onSubmit={handleSubmit}>
            <div className="row">
              {Object.keys(formData).map(
                (field, index) => (
                  <div
                    key={index}
                    className="col-md-4 mb-3"
                  >
                    <label className="form-label text-capitalize">
                      {field}
                    </label>
                    <input
                      type="number"
                      name={field}
                      className="form-control"
                      value={formData[field]}
                      onChange={handleChange}
                      required
                    />
                  </div>
                )
              )}
            </div>

            <div className="text-center mt-4">
              <button
                type="submit"
                className="btn btn-primary btn-lg px-5"
                disabled={loading}
              >
                {loading
                  ? "Processing..."
                  : "Get Crop Recommendations"}
              </button>
            </div>
          </form>
        </div>

        {recommendedCrop && (
          <div className="result-section mt-5">
            <h2 className="text-center mb-4">
              Recommended Crop
            </h2>

            <div className="row justify-content-center">
              <div className="col-md-4">
                <div className="crop-card">
                  <h4>{recommendedCrop}</h4>
                  <span className="badge bg-success">
                    Highly Suitable
                  </span>
                </div>
              </div>
            </div>

            <div className="text-center mt-4">
              <button
                onClick={handleReset}
                className="btn btn-success"
              >
                Start New Recommendation
              </button>
            </div>
          </div>
        )}
      </div>

      {/* SAME CSS */}
      <style>{`
        .hero-section {
          padding: 60px 0;
          margin-bottom: 40px;
        }

        .recommendation-form {
          background: #fff;
          padding: 30px;
          border-radius: 10px;
          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }

        .crop-card {
          background: #fff;
          padding: 25px;
          border-radius: 10px;
          box-shadow: 0 4px 15px rgba(0,0,0,0.1);
          border-left: 4px solid #28a745;
        }

        .result-section {
          background: #f8f9fa;
          padding: 40px 20px;
          border-radius: 10px;
        }
      `}</style>
    </>
  );
};

export default CropRecommendation;
