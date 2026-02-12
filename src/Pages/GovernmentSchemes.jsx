import React from "react";
import SchemesGrid from "../Components/SchemesGrid";
import { useGovernmentSchemes } from "../Hooks/useGovernmentSchemes";

const GovernmentSchemes = () => {
  const { state, dispatch, applyFilters } = useGovernmentSchemes();

  const handleFilterChange = (e) => {
    dispatch({
      type: "SET_FILTER",
      field: e.target.name,
      value: e.target.value,
    });
  };

  return (
    <>
      {/* SAME HERO SECTION */}
      {/* Hero Section */}
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
            style={{ maxWidth: "850x", opacity: 0.9 }}
          >
            Discover and apply for various government initiatives designed to
            support and empower farmers across India. Find subsidies, financial
            assistance, and development programs tailored to your needs.
          </p>
        </div>
      </section>

      {/* FILTER SECTION (SAME DESIGN) */}
      <section className="py-4">
        <div className="container">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              applyFilters();
            }}
          >
            <div className="row g-3">
              <div className="col-md-4">
                <select
                  className="form-select"
                  name="schemeType"
                  value={state.filters.schemeType}
                  onChange={handleFilterChange}
                >
                  <option value="">All Types</option>
                  <option value="subsidy">Subsidy</option>
                  <option value="loan">Loan</option>
                  <option value="insurance">Insurance</option>
                </select>
              </div>

              <div className="col-md-4">
                <select
                  className="form-select"
                  name="state"
                  value={state.filters.state}
                  onChange={handleFilterChange}
                >
                  <option value="">All States</option>
                  <option value="maharashtra">Maharashtra</option>
                  <option value="punjab">Punjab</option>
                </select>
              </div>

              <div className="col-md-4">
                <select
                  className="form-select"
                  name="category"
                  value={state.filters.category}
                  onChange={handleFilterChange}
                >
                  <option value="">All Categories</option>
                  <option value="small">Small Farmer</option>
                  <option value="marginal">Marginal Farmer</option>
                </select>
              </div>
            </div>

            <div className="mt-4 d-flex gap-2">
              <button className="btn-agri-primary">Apply Filters</button>
              <button
                type="button"
                className="btn-agri-outline"
                onClick={() => dispatch({ type: "RESET_FILTERS" })}
              >
                Reset
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* SCHEMES GRID */}
      <section className="py-5">
        <div className="container">
          <SchemesGrid filteredSchemes={state.filteredSchemes} />
        </div>
      </section>

      {/* SAME CSS KEPT EXACTLY */}
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
