import React from "react";

const DiseaseCards = ({ diseases = [] }) => {
  if (!diseases.length) {
    return (
      <div className="alert alert-warning text-center">
        No disease information available.
      </div>
    );
  }

  return (
    <div className="container-fluid">

      <h4 className="text-danger fw-bold mb-4">
        🦠 Disease & Pest Management
      </h4>

      <div className="row">

        {diseases.map((item) => (

          <div className="col-lg-6 mb-4" key={item.id}>

            <div className="card h-100 shadow-sm border-danger">

              <div className="card-header bg-danger text-white">

                <div className="d-flex justify-content-between align-items-center">

                  <h5 className="mb-0">
                    🦠 {item.diseaseName}
                  </h5>

                  <span className="badge bg-light text-danger">
                    {item.sprayInterval}
                  </span>

                </div>

              </div>

              <div className="card-body">

                <div className="mb-3">

                  <h6 className="fw-bold">
                    🔍 Symptoms
                  </h6>

                  <p className="text-muted mb-0">
                    {item.symptoms}
                  </p>

                </div>

                <div className="mb-3">

                  <h6 className="fw-bold text-success">
                    🛡 Prevention
                  </h6>

                  <p className="text-muted mb-0">
                    {item.prevention}
                  </p>

                </div>

                <hr />

                <div className="row">

                  <div className="col-md-6">

                    <strong>💊 Medicine</strong>

                    <p className="mb-0">
                      {item.medicine}
                    </p>

                  </div>

                  <div className="col-md-6">

                    <strong>⚗ Dosage</strong>

                    <p className="mb-0">
                      {item.dosage}
                    </p>

                  </div>

                </div>

              </div>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
};

export default DiseaseCards;