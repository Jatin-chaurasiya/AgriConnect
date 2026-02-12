import React from "react";
import { Link } from "react-router-dom";

const SchemesGrid = ({ filteredSchemes }) => {
  return (
    <>
      {filteredSchemes.length === 0 && (
        <div className="text-center py-5">
          <div className="alert alert-info d-inline-block">
            No schemes found matching your filters.
          </div>
        </div>
      )}

      {filteredSchemes.length > 0 && (
        <>
          <div className="row g-4">
            {filteredSchemes.map((scheme) => (
              <div key={scheme.id} className="col-md-6 col-lg-4">
                <div className="scheme-card card h-100 border-0 shadow-sm hover-shadow">
                  <div className="position-relative">
                    <span className="scheme-badge position-absolute top-0 start-0 m-3 badge bg-primary">
                      {scheme.schemeType}
                    </span>
                    <img
                      src={scheme.imageUrl}
                      className="card-img-top"
                      alt={scheme.name}
                      style={{
                        height: "200px",
                        objectFit: "cover",
                      }}
                    />
                  </div>

                  <div className="card-body d-flex flex-column">
                    <h5
                      className="card-title fw-semibold mb-3"
                      style={{ color: "#2D5016" }}
                    >
                      {scheme.name}
                    </h5>

                    <p className="card-text flex-grow-1 text-muted">
                      {scheme.description}
                    </p>

                    <div className="d-flex gap-2 mt-auto">
                      <Link
                        to={`/apply-scheme/${scheme.id}`}
                        className="btn btn-agri-primary flex-fill"
                      >
                        Apply Now
                      </Link>
                      <Link
                        to={`/scheme-details/${scheme.id}`}
                        className="btn btn-agri-outline flex-fill"
                      >
                        Details
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-4">
            Showing <strong>{filteredSchemes.length}</strong> scheme(s)
          </div>
        </>
      )}
    </>
  );
};

export default SchemesGrid;
