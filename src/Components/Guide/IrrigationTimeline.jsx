import React from "react";

const formatDay = (day) => {
  const dayNum = Number(day);

  if (dayNum === -7) return "7 Days Before Sowing";
  if (dayNum === 0) return "Sowing Day";

  if (dayNum > 0) return `${dayNum} Days After Sowing`;

  return `${Math.abs(dayNum)} Days Before Sowing`;
};

const IrrigationTimeline = ({ irrigations = [] }) => {
  if (!irrigations.length) {
    return (
      <div className="alert alert-warning text-center">
        No irrigation schedule available.
      </div>
    );
  }

  return (
    <div className="container-fluid">

      <h4 className="text-primary fw-bold mb-4">
        💧 Irrigation Schedule
      </h4>

      {irrigations.map((item, index) => (
        <div className="d-flex mb-4" key={item.id}>

          {/* Timeline */}

          <div
            className="d-flex flex-column align-items-center me-4"
            style={{ minWidth: "40px" }}
          >
            <div
              className="rounded-circle bg-primary"
              style={{
                width: "18px",
                height: "18px",
              }}
            />

            {index !== irrigations.length - 1 && (
              <div
                className="bg-primary"
                style={{
                  width: "3px",
                  height: "120px",
                }}
              />
            )}
          </div>

          {/* Card */}

          <div className="card shadow-sm border-primary w-100">

            <div className="card-header bg-light">

              <div className="d-flex justify-content-between flex-wrap">

                <h5 className="text-primary mb-0">
                  {formatDay(item.dayNumber)}
                </h5>

                <span className="badge bg-primary">
                  {item.stage}
                </span>

              </div>

            </div>

            <div className="card-body">

              <strong>📋 Irrigation Instruction</strong>

              <p className="text-muted mt-2 mb-0">
                {item.description}
              </p>

            </div>

          </div>

        </div>
      ))}

    </div>
  );
};

export default IrrigationTimeline;