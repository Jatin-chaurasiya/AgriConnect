import React from "react";
import { useState } from "react";
import SchemesGrid from "../Components/SchemesGrid";
import { useGovernmentSchemes } from "../Hooks/useGovernmentSchemes";

const GovernmentSchemes = () => {
  const { state, dispatch, applyFilters, hasSearched, resetFilters } =
    useGovernmentSchemes();
  const [showValidation, setShowValidation] = useState(false);

  const handleFilterChange = (e) => {
    dispatch({
      type: "SET_FILTER",
      field: e.target.name,
      value: e.target.value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    const result = applyFilters();

    if (result?.error === "NO_FILTER") {
      setShowValidation(true);
    } else {
      setShowValidation(false);
    }
  };

  const hasSchemes = state.filteredSchemes && state.filteredSchemes.length > 0;

  return (
    <>
      {/* HERO */}
      <section
        className="hero-section d-flex align-items-center text-center"
        style={{
          background: "#2D5016",
          minHeight: "250px",
          padding: "50px 0",
        }}
      >
        <div className="container">
          <h1 className="display-4 fw-bold text-white mb-3">
            Government Schemes for Farmers
          </h1>

          <p
            className="lead text-white mx-auto"
            style={{ maxWidth: "850px", opacity: 0.9 }}
          >
            Discover and apply for various government initiatives designed to
            support and empower farmers across India.
          </p>
        </div>
      </section>

      {/* FILTER SECTION */}
      <section className="py-4">
        <div className="container">
          <form
            onSubmit={(e) => {
              e.preventDefault();

              const result = applyFilters();

              if (result?.error === "NO_FILTER") {
                setShowValidation(true);
              } else {
                setShowValidation(false);
              }
            }}
          >
            <div className="row g-3">
              {/* Scheme Type */}
              <div className="col-md-4">
                <select
                  className="form-select"
                  name="schemeType"
                  value={state.filters.schemeType}
                  onChange={handleFilterChange}
                >
                  <option value="SELECT" disabled>
                    Select Type
                  </option>
                  <option value="">All Types</option>
                  <option value="SUBSIDY">Subsidy</option>
                  <option value="LOAN">Loan</option>
                  <option value="INSURANCE">Insurance</option>
                </select>
              </div>

              {/* State */}
              <div className="col-md-4">
                <select
                  className="form-select"
                  name="state"
                  value={state.filters.state}
                  onChange={handleFilterChange}
                >
                  <option value="SELECT" disabled>
                    Select State
                  </option>
                  <option value="">All States</option>
                  <option value="UP">Uttar Pradesh</option>
                  <option value="MH">Maharashtra</option>
                  <option value="MP">Madhya Pradesh</option>
                  <option value="RJ">Rajasthan</option>
                </select>
              </div>

              {/* Category */}
              <div className="col-md-4">
                <select
                  className="form-select"
                  name="category"
                  value={state.filters.category}
                  onChange={handleFilterChange}
                >
                  <option value="SELECT" disabled>
                    Select Category
                  </option>
                  <option value="">All Categories</option>
                  <option value="SMALL_FARMER">Small Farmer</option>
                  <option value="MARGINAL_FARMER">Marginal Farmer</option>
                </select>
              </div>
            </div>

            <div className="mt-4 d-flex gap-2">
              <button type="submit" className="btn-agri-primary">
                Apply Filters
              </button>

              <button
                type="button"
                className="btn-agri-outline"
                onClick={resetFilters}
              >
                Reset
              </button>
            </div>
            {showValidation && (
              <p className="text-danger mt-2">
                Please select at least one filter before applying.
              </p>
            )}
          </form>
        </div>
      </section>

      <section className="py-5">
        <div className="container">
          {!state.filteredSchemes || state.filteredSchemes.length === 0 ? (
            <div className="text-center py-5">
              <div style={{ fontSize: "40px", color: "#adb5bd" }}>📄</div>

              {!hasSearched ? (
                <>
                  <h5 className="mt-3 mb-2">No Scheme Available</h5>

                  <p style={{ color: "#6c757d", fontSize: "14px" }}>
                    Please select filters and click{" "}
                    <strong>Apply Filters</strong> to view schemes.
                  </p>
                </>
              ) : (
                <>
                  <h5 className="mt-3 mb-2 text-danger">
                    NO SCHEME AVAILABLE ON THIS FILTER
                  </h5>

                  <p style={{ color: "#6c757d", fontSize: "14px" }}>
                    Try changing filters and search again.
                  </p>
                </>
              )}
            </div>
          ) : (
            <SchemesGrid filteredSchemes={state.filteredSchemes} />
          )}
        </div>
      </section>
      {/* CSS */}
      <style>{`
        .btn-agri-primary {
          background-color: #2D5016;
          color: white;
          border: none;
          padding: 10px 20px;
          border-radius: 6px;
        }

        .btn-agri-outline {
          border: 2px solid #2D5016;
          background: transparent;
          color: #2D5016;
          padding: 10px 20px;
          border-radius: 6px;
        }

        .scheme-card {
          transition: transform 0.3s ease;
        }

        .hover-shadow:hover {
          transform: translateY(-5px);
        }
      `}</style>
    </>
  );
};

export default GovernmentSchemes;
