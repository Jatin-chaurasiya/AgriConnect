import React, { useState } from "react";

const CultivationGuide = ({ cropPlanner }) => {
  const [activeTab, setActiveTab] = useState("fertilizer");

  return (
    <div className="card shadow mt-5">
      <div className="card-header bg-success text-white text-center">
        <h3 className="mb-0">🌾 Cultivation Guide</h3>
      </div>

      <div className="card-body">

        <div className="d-flex flex-wrap gap-2 mb-4">

          <button
            className={`btn ${
              activeTab === "fertilizer"
                ? "btn-success"
                : "btn-outline-success"
            }`}
            onClick={() => setActiveTab("fertilizer")}
          >
            🌱 Fertilizer
          </button>

          <button
            className={`btn ${
              activeTab === "irrigation"
                ? "btn-success"
                : "btn-outline-success"
            }`}
            onClick={() => setActiveTab("irrigation")}
          >
            💧 Irrigation
          </button>

          <button
            className={`btn ${
              activeTab === "disease"
                ? "btn-success"
                : "btn-outline-success"
            }`}
            onClick={() => setActiveTab("disease")}
          >
            🦠 Disease
          </button>

          <button
            className={`btn ${
              activeTab === "calendar"
                ? "btn-success"
                : "btn-outline-success"
            }`}
            onClick={() => setActiveTab("calendar")}
          >
            📅 Calendar
          </button>

          <button
            className={`btn ${
              activeTab === "tips"
                ? "btn-success"
                : "btn-outline-success"
            }`}
            onClick={() => setActiveTab("tips")}
          >
            🤖 AI Tips
          </button>

        </div>

        <hr />

        {activeTab === "fertilizer" && (
          <h5>🌱 Fertilizer Timeline Here...</h5>
        )}

        {activeTab === "irrigation" && (
          <h5>💧 Irrigation Timeline Here...</h5>
        )}

        {activeTab === "disease" && (
          <h5>🦠 Disease Cards Here...</h5>
        )}

        {activeTab === "calendar" && (
          <h5>📅 Crop Calendar Here...</h5>
        )}

        {activeTab === "tips" && (
          <h5>🤖 AI Suggestions Here...</h5>
        )}

      </div>
    </div>
  );
};

export default CultivationGuide;