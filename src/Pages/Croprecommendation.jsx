import React, { useState } from "react";
import { useCropRecommendation } from "../Hooks/useCropRecommendation";
import { useTranslation } from "react-i18next";
import CropPlannerSection from "../Components/CropPlannerSection";
import CultivationGuide from "../Components/CultivationGuide";

const CropRecommendation = () => {
  const { t } = useTranslation();

  const {
    state,
    dispatch,
    handleSubmit,
    handleCropPlanner,
    handleReset,
  } = useCropRecommendation();

  const {
    formData,
    loading,
    recommendedCrop,
    plannerLoading,
    cropPlanner,
  } = state;

  // planner | guide
  const [activeView, setActiveView] = useState("planner");

  const handleChange = (e) => {
    dispatch({
      type: "UPDATE_FIELD",
      field: e.target.name,
      value: e.target.value,
    });
  };

  return (
    <>
      <section
        className="hero-section"
        style={{ backgroundColor: "#2D5016" }}
      >
        <div className="container text-center">
          <h1 className="display-4 fw-bold text-white mb-3">
            {t("cropRecommendation.title")}
          </h1>

          <p className="lead text-white">
            {t("cropRecommendation.subtitle")}
          </p>
        </div>
      </section>

      <div className="container my-5">
        {/* ================= Form ================= */}

        <div className="recommendation-form">
          <h2 className="text-center mb-4">
            {t("cropRecommendation.farmDetails")}
          </h2>

          <form onSubmit={handleSubmit}>
            <div className="row">
              {Object.keys(formData).map((field) => (
                <div key={field} className="col-md-4 mb-3">
                  <label className="form-label text-capitalize">
                    {t(`cropRecommendation.${field}`)}
                  </label>

                  <input
                    type="number"
                    name={field}
                    value={formData[field]}
                    onChange={handleChange}
                    className="form-control"
                    placeholder={t(
                      `cropRecommendation.${field}Placeholder`
                    )}
                    required
                  />
                </div>
              ))}
            </div>

            <div className="text-center mt-4">
              <button
                type="submit"
                className="btn btn-primary btn-lg px-5"
                disabled={loading}
              >
                {loading
                  ? t("cropRecommendation.processing")
                  : t("cropRecommendation.getRecommendation")}
              </button>
            </div>
          </form>
        </div>

        {/* ================= Recommendation ================= */}

        {recommendedCrop && (
          <div className="result-section mt-5">
            <h2 className="text-center mb-4">
              {t("cropRecommendation.recommendedCrop")}
            </h2>

            <div className="row justify-content-center">
              <div className="col-md-5">
                <div className="crop-card text-center">
                  <h3 className="mb-3">
                    🌱{" "}
                    {t(
                      `crops.${recommendedCrop.toLowerCase()}`,
                      recommendedCrop
                    )}
                  </h3>

                  <span className="badge bg-success fs-6">
                    {t("cropRecommendation.highlySuitable")}
                  </span>
                </div>
              </div>
            </div>

            {/* Buttons */}

            <div className="text-center mt-4">

              <button
                className="btn btn-warning btn-lg me-3"
                onClick={() => {
                  setActiveView("planner");
                  handleCropPlanner();
                }}
                disabled={plannerLoading}
              >
                {plannerLoading
                  ? "Generating Crop Plan..."
                  : "🌾 Get Crop Planner"}
              </button>

              <button
                className="btn btn-primary btn-lg me-3"
                onClick={() => setActiveView("guide")}
                disabled={!cropPlanner}
              >
                📖 Cultivation Guide
              </button>

              <button
                onClick={handleReset}
                className="btn btn-success btn-lg"
              >
                {t("cropRecommendation.startNewRecommendation")}
              </button>

            </div>
          </div>
        )}

        {/* ================= Dynamic View ================= */}

        {activeView === "planner" && cropPlanner && (
          <CropPlannerSection cropPlanner={cropPlanner} />
        )}

        {activeView === "guide" && cropPlanner && (
          <CultivationGuide cropPlanner={cropPlanner} />
        )}
      </div>

      <style>{`
        .hero-section {
          padding: 60px 0;
          margin-bottom: 40px;
        }

        .recommendation-form {
          background: #fff;
          padding: 30px;
          border-radius: 12px;
          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }

        .crop-card {
          background: #fff;
          padding: 30px;
          border-radius: 12px;
          box-shadow: 0 4px 15px rgba(0,0,0,0.1);
          border-left: 5px solid #28a745;
        }

        .result-section {
          background: #f8f9fa;
          padding: 40px 20px;
          border-radius: 12px;
        }
      `}</style>
    </>
  );
};

export default CropRecommendation;