import React from "react";

const formatDay = (day) => {
  const dayNum = Number(day);

  if (dayNum === -7) return "7 Days Before Sowing";
  if (dayNum === 0) return "Sowing Day";

  if (dayNum > 0) return `${dayNum} Days After Sowing`;

  return `${Math.abs(dayNum)} Days Before Sowing`;
};

const CropCalendar = ({ calendarActivities = [] }) => {
  if (!calendarActivities.length) {
    return (
      <div className="alert alert-warning text-center">
        No crop calendar available.
      </div>
    );
  }

  return (
    <div className="container-fluid">

      <h4 className="text-warning fw-bold mb-4">
        📅 Crop Calendar
      </h4>

      {calendarActivities.map((item, index) => (

        <div className="d-flex mb-4" key={item.id}>

          {/* Timeline */}

          <div
            className="d-flex flex-column align-items-center me-4"
            style={{ minWidth: "40px" }}
          >

            <div
              className="rounded-circle bg-warning"
              style={{
                width: "18px",
                height: "18px",
              }}
            />

            {index !== calendarActivities.length - 1 && (
              <div
                className="bg-warning"
                style={{
                  width: "3px",
                  height: "120px",
                }}
              />
            )}

          </div>

          {/* Card */}

          <div className="card shadow-sm border-warning w-100">

            <div className="card-header bg-light">

              <div className="d-flex justify-content-between flex-wrap">

                <h5 className="text-warning mb-0">

                  {formatDay(item.dayNumber)}

                </h5>

                <span className="badge bg-warning text-dark">

                  {item.activity}

                </span>

              </div>

            </div>

            <div className="card-body">

              <strong>📝 Activity Description</strong>

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

export default CropCalendar;