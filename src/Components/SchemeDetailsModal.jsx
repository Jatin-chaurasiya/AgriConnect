import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { BASE_URL, API_ENDPOINTS } from "../Util/apiEndPoints.js";

const SchemeDetailsModal = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [scheme, setScheme] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchScheme = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await fetch(
          `${BASE_URL}${API_ENDPOINTS.SCHEMES}/${id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              ...(token && { Authorization: `Bearer ${token}` }),
            },
          }
        );

        if (!res.ok) throw new Error(`Status: ${res.status}`);

        const data = await res.json();
        setScheme(data);
      } catch (err) {
        console.error("Error fetching scheme:", err);
        setError("Failed to load scheme details.");
      } finally {
        setLoading(false);
      }
    };

    fetchScheme();
  }, [id]);

  const handleClose = () => navigate("/GovernmentSchemes");

  // 🔄 Loading
  if (loading) {
    return (
      <div className="modal-overlay">
        <div className="modal-box text-center">
          <div className="spinner-border text-success mb-3" />
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  // ❌ Error
  if (error) {
    return (
      <div className="modal-overlay">
        <div className="modal-box text-center">
          <p className="text-danger">{error}</p>
          <button onClick={handleClose} className="btn btn-success">
            Close
          </button>
        </div>
      </div>
    );
  }

  if (!scheme) return null;

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>

        {/* Image */}
        <div className="modal-header-img">
          <img src={scheme.imageUrl} alt={scheme.name} />

          {/* Close */}
          <button className="close-btn" onClick={handleClose}>✕</button>

          {/* Type */}
          <span className="type-badge">{scheme.type}</span>
        </div>

        {/* Content */}
        <div className="modal-body">
          <h2>{scheme.name}</h2>
          <p className="desc">{scheme.description}</p>

          {scheme.eligibility && (
            <Section title="📋 Eligibility" content={scheme.eligibility} />
          )}

          {scheme.benefits && (
            <Section title="🌟 Benefits" content={scheme.benefits} />
          )}

          {scheme.process && (
            <Section title="🔄 How to Apply" content={scheme.process} />
          )}

          {/* Buttons */}
          <div className="modal-footer">
            <button onClick={handleClose} className="btn-outline">
              Cancel
            </button>

            <a
              href={scheme.applyLink}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              Apply Now →
            </a>
          </div>
        </div>

      </div>
    </div>
  );
};

// 🔹 Reusable Section
const Section = ({ title, content }) => (
  <div className="section-box">
    <h6>{title}</h6>
    <p>{content}</p>
  </div>
);

export default SchemeDetailsModal;