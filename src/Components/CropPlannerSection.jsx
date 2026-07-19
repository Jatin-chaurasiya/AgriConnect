import React from "react";

const CropPlannerSection = ({ cropPlanner }) => {
  if (!cropPlanner) return null;

  return (
    <div className="planner-section mt-5">

      <div className="text-center mb-5">
        <h2 className="fw-bold text-success">
          🌾 AI Crop Planner
        </h2>

        <p className="text-muted">
          Complete cultivation guide for {cropPlanner.cropName}
        </p>
      </div>

      {/* ================= Crop Information ================= */}

      <div className="card shadow-sm border-0 mb-4">
        <div className="card-header bg-success text-white">
          🌱 Crop Information
        </div>

        <div className="card-body">
          <div className="row">

            <div className="col-md-6 mb-3">
              <strong>Crop Name</strong>
              <p>{cropPlanner.cropName}</p>
            </div>

            <div className="col-md-6 mb-3">
              <strong>Scientific Name</strong>
              <p>{cropPlanner.scientificName}</p>
            </div>

            <div className="col-md-6 mb-3">
              <strong>Crop Type</strong>
              <p>{cropPlanner.cropType}</p>
            </div>

            <div className="col-md-6 mb-3">
              <strong>Season</strong>
              <p>{cropPlanner.season}</p>
            </div>

            <div className="col-md-6 mb-3">
              <strong>Duration</strong>
              <p>{cropPlanner.durationDays} Days</p>
            </div>

            <div className="col-md-6 mb-3">
              <strong>Ideal Temperature</strong>
              <p>{cropPlanner.idealTemperature}</p>
            </div>

            <div className="col-md-6 mb-3">
              <strong>Humidity</strong>
              <p>{cropPlanner.idealHumidity}</p>
            </div>

            <div className="col-md-6 mb-3">
              <strong>Ideal pH</strong>
              <p>{cropPlanner.idealPh}</p>
            </div>

            <div className="col-md-6 mb-3">
              <strong>Rainfall</strong>
              <p>{cropPlanner.rainfall}</p>
            </div>

            <div className="col-12">
              <strong>Description</strong>
              <p>{cropPlanner.description}</p>
            </div>

          </div>
        </div>
      </div>

      {/* ================= Financial Summary ================= */}

      <div className="row mb-4">

        <div className="col-md-4 mb-3">
          <div className="card text-center border-0 shadow-sm bg-warning">
            <div className="card-body">
              <h6>Estimated Cost</h6>
              <h3>₹ {cropPlanner.estimatedCost}</h3>
            </div>
          </div>
        </div>

        <div className="col-md-4 mb-3">
          <div className="card text-center border-0 shadow-sm bg-info text-white">
            <div className="card-body">
              <h6>Expected Income</h6>
              <h3>₹ {cropPlanner.expectedIncome}</h3>
            </div>
          </div>
        </div>

        <div className="col-md-4 mb-3">
          <div className="card text-center border-0 shadow-sm bg-success text-white">
            <div className="card-body">
              <h6>Expected Profit</h6>
              <h3>₹ {cropPlanner.expectedProfit}</h3>
            </div>
          </div>
        </div>

      </div>

      {/* ================= Seed Information ================= */}

      <div className="card shadow-sm border-0 mb-4">

        <div className="card-header bg-success text-white">
          🌱 Seed Information
        </div>

        <div className="card-body table-responsive">

          <table className="table table-bordered table-hover">

            <thead className="table-success">

              <tr>
                <th>Variety</th>
                <th>Seed Rate</th>
                <th>Spacing</th>
                <th>Germination</th>
                <th>Approx Cost</th>
              </tr>

            </thead>

            <tbody>

              {cropPlanner.seeds?.map((seed) => (

                <tr key={seed.id}>

                  <td>{seed.variety}</td>

                  <td>{seed.seedRate}</td>

                  <td>{seed.spacing}</td>

                  <td>{seed.germination}</td>

                  <td>₹ {seed.approxCost}</td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

      {/* ================= Cost Details ================= */}

      <div className="card shadow-sm border-0 mb-4">

        <div className="card-header bg-primary text-white">
          💰 Cost Breakdown
        </div>

        <div className="card-body table-responsive">

          <table className="table table-bordered">

            <thead className="table-primary">

              <tr>
                <th>Region</th>
                <th>Seeds</th>
                <th>Fertilizer</th>
                <th>Pesticide</th>
                <th>Labour</th>
                <th>Irrigation</th>
                <th>Harvest</th>
                <th>Total</th>
              </tr>

            </thead>

            <tbody>

              {cropPlanner.costs?.map((cost) => (

                <tr key={cost.id}>

                  <td>{cost.state}</td>

                  <td>₹ {cost.seedCost}</td>

                  <td>₹ {cost.fertilizerCost}</td>

                  <td>₹ {cost.pesticideCost}</td>

                  <td>₹ {cost.labourCost}</td>

                  <td>₹ {cost.irrigationCost}</td>

                  <td>₹ {cost.harvestingCost}</td>

                  <td className="fw-bold">
                    ₹ {cost.totalCost}
                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

      {/* ================= Yield ================= */}

      <div className="card shadow-sm border-0">

        <div className="card-header bg-dark text-white">
          📈 Yield Details
        </div>

        <div className="card-body table-responsive">

          <table className="table table-bordered">

            <thead className="table-dark">

              <tr>
                <th>Region</th>
                <th>Yield</th>
                <th>Market Price</th>
                <th>Income</th>
                <th>Profit</th>
              </tr>

            </thead>

            <tbody>

              {cropPlanner.yields?.map((yieldData) => (

                <tr key={yieldData.id}>

                  <td>{yieldData.state}</td>

                  <td>
                    {yieldData.expectedYield}{" "}
                    {yieldData.yieldUnit}
                  </td>

                  <td>
                    ₹ {yieldData.marketPrice}
                  </td>

                  <td>
                    ₹ {yieldData.expectedIncome}
                  </td>

                  <td className="text-success fw-bold">
                    ₹ {yieldData.expectedProfit}
                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
};

export default CropPlannerSection;