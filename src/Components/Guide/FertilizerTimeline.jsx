import React from "react";

const formatDay = (day) => {
  const dayNum = Number(day);

  if (dayNum === -7) return "7 Days Before Sowing";
  if (dayNum === 0) return "Sowing Day";

  if (dayNum > 0) return `${dayNum} Days After Sowing`;

  return `${Math.abs(dayNum)} Days Before Sowing`;
};

const FertilizerTimeline = ({ fertilizers = [] }) => {
  if (!fertilizers.length) {
    return (
      <div className="alert alert-warning text-center">
        No fertilizer schedule available.
      </div>
    );
  }

  return (
    <div className="container-fluid">

      <h4 className="text-success fw-bold mb-4">
        🌱 Fertilizer Schedule
      </h4>

      {fertilizers.map((item, index) => (
        <div className="d-flex mb-4" key={item.id}>

          {/* Timeline */}

          <div
            className="d-flex flex-column align-items-center me-4"
            style={{ minWidth: "40px" }}
          >
            <div
              className="rounded-circle bg-success"
              style={{
                width: "18px",
                height: "18px",
              }}
            />

            {index !== fertilizers.length - 1 && (
              <div
                className="bg-success"
                style={{
                  width: "3px",
                  height: "120px",
                }}
              />
            )}
          </div>

          {/* Card */}

          <div className="card shadow-sm border-success w-100">

            <div className="card-header bg-light">

              <div className="d-flex justify-content-between flex-wrap">

                <h5 className="text-success mb-0">

                  {formatDay(item.dayNumber)}

                </h5>

                <span className="badge bg-success">

                  {item.stage}

                </span>

              </div>

            </div>

            <div className="card-body">

              <div className="row">

                <div className="col-md-6 mb-3">

                  <strong>🌿 Fertilizer</strong>

                  <p className="mb-0">

                    {item.fertilizerName}

                  </p>

                </div>

                <div className="col-md-6 mb-3">

                  <strong>📦 Quantity</strong>

                  <p className="mb-0">

                    {item.quantity} {item.unit}

                  </p>

                </div>

                <div className="col-12">

                  <strong>🎯 Purpose</strong>

                  <p className="text-muted mb-0">

                    {item.purpose}

                  </p>

                </div>

              </div>

            </div>

          </div>

        </div>
      ))}
    </div>
  );
};

export default FertilizerTimeline;