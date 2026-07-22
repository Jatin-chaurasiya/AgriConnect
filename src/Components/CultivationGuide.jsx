import React, { useState } from "react";
import FertilizerTimeline from "./Guide/FertilizerTimeline";
import IrrigationTimeline from "./Guide/IrrigationTimeline";
import DiseaseCards from "./Guide/DiseaseCards";
import CropCalendar from "./Guide/CropCalendar";

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
              activeTab === "fertilizer" ? "btn-success" : "btn-outline-success"
            }`}
            onClick={() => setActiveTab("fertilizer")}
          >
            🌱 Fertilizer
          </button>

          <button
            className={`btn ${
              activeTab === "irrigation" ? "btn-success" : "btn-outline-success"
            }`}
            onClick={() => setActiveTab("irrigation")}
          >
            💧 Irrigation
          </button>

          <button
            className={`btn ${
              activeTab === "disease" ? "btn-success" : "btn-outline-success"
            }`}
            onClick={() => setActiveTab("disease")}
          >
            🦠 Disease
          </button>

          <button
            className={`btn ${
              activeTab === "calendar" ? "btn-success" : "btn-outline-success"
            }`}
            onClick={() => setActiveTab("calendar")}
          >
            📅 Calendar
          </button>

          <button
            className={`btn ${
              activeTab === "tips" ? "btn-success" : "btn-outline-success"
            }`}
            onClick={() => setActiveTab("tips")}
          >
            🤖 AI Tips
          </button>
        </div>

        <hr />

        {activeTab === "fertilizer" && (
          <FertilizerTimeline fertilizers={cropPlanner?.fertilizers || []} />
        )}

        {activeTab === "irrigation" && (
          <IrrigationTimeline irrigations={cropPlanner?.irrigations || []} />
        )}

        {activeTab === "disease" && (
          <DiseaseCards diseases={cropPlanner?.diseases || []} />
        )}

        {activeTab === "calendar" && (
          <CropCalendar
            calendarActivities={cropPlanner?.calendarActivities || []}
          />
        )}

        {activeTab === "tips" && <h5>🤖 AI Suggestions Here...</h5>}
      </div>
    </div>
  );
};

export default CultivationGuide;
