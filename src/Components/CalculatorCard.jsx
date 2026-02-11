import React from "react";

const CalculatorCard = ({
  title,
  type,
  data,
  updateField,
  calculate,
}) => {
  return (
    <div className="col-lg-4 col-md-6">
      <div className="calculator-card">

        <h4 className="card-title text-center">{title}</h4>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            calculate(type);
          }}
        >
          {/* Crop Select */}
          <div className="mb-3">
            <label className="form-label">Crop Type</label>
            <select
              className="form-select"
              value={data.form.cropType}
              onChange={(e) =>
                updateField(type, "cropType", e.target.value)
              }
            >
              <option value="">Select crop</option>
              <option value="wheat">Wheat</option>
              <option value="rice">Rice</option>
              <option value="maize">Maize</option>
              <option value="cotton">Cotton</option>
              <option value="pulses">Pulses</option>
            </select>
          </div>

          {/* Area Input */}
          <div className="mb-3">
            <label className="form-label">Area (acres)</label>
            <input
              type="number"
              className="form-control"
              placeholder="Enter area"
              min="0.1"
              step="0.1"
              value={data.form.area}
              onChange={(e) =>
                updateField(type, "area", e.target.value)
              }
            />
          </div>

          {/* Soil Select */}
          <div className="mb-3">
            <label className="form-label">Soil Type</label>
            <select
              className="form-select"
              value={data.form.soilType}
              onChange={(e) =>
                updateField(type, "soilType", e.target.value)
              }
            >
              <option value="">Select soil</option>
              <option value="sandy">Sandy</option>
              <option value="loamy">Loamy</option>
              <option value="clay">Clay</option>
              <option value="silt">Silt</option>
            </select>
          </div>

          <button type="submit" className="btn btn-calc">
            Calculate
          </button>
        </form>

        {/* Result Section */}
        {data.result && (
          <div className="result-box">
            <div className="result-title">Result:</div>

            {typeof data.result === "string" ? (
              <div className="text-danger">{data.result}</div>
            ) : (
              Object.entries(data.result).map(([key, value]) => (
                <div key={key} className="result-value">
                  {key.toUpperCase()}:{" "}
                  {key === "water"
                    ? value.toLocaleString() + " liters"
                    : value + " kg"}
                </div>
              ))
            )}
          </div>
        )}

      </div>

      {/* Styles */}
      <style>{`
        .calculator-card {
          background: #ffffff;
          border-radius: 16px;
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.08);
          padding: 25px;
          height: 100%;
          transition: all 0.3s ease;
        }

        .calculator-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 12px 28px rgba(0, 0, 0, 0.12);
        }

        .card-title {
          color: #2c5530;
          font-weight: 600;
          margin-bottom: 20px;
        }

        .form-label {
          font-weight: 600;
          color: #495057;
        }

        .btn-calc {
          background-color: #28a745;
          border: none;
          font-weight: 600;
          padding: 10px;
          border-radius: 8px;
          width: 100%;
          color: white;
          transition: 0.3s ease;
        }

        .btn-calc:hover {
          background-color: #218838;
        }

        .result-box {
          background-color: #f8f9fa;
          border-radius: 10px;
          padding: 15px;
          margin-top: 20px;
          border-left: 5px solid #28a745;
        }

        .result-title {
          font-weight: 600;
          color: #2c5530;
          margin-bottom: 8px;
        }

        .result-value {
          font-size: 1rem;
          font-weight: 600;
          color: #495057;
        }
      `}</style>
    </div>
  );
};

export default CalculatorCard;
