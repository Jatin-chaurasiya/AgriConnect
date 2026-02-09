import React, { useState } from 'react';

const FarmingCalculators = () => {
  // State for Fertilizer Calculator
  const [fertForm, setFertForm] = useState({
    cropType: '',
    area: '',
    soilType: ''
  });
  const [fertResult, setFertResult] = useState(null);

  // State for Seed Calculator
  const [seedForm, setSeedForm] = useState({
    cropType: '',
    area: '',
    soilType: ''
  });
  const [seedResult, setSeedResult] = useState(null);

  // State for Irrigation Calculator
  const [irrForm, setIrrForm] = useState({
    cropType: '',
    area: '',
    soilType: ''
  });
  const [irrResult, setIrrResult] = useState(null);

  // Calculator Functions
  const fertilizerCalculator = (crop, soilType, area) => {
    const fertReqs = {
      "wheat": { "N": 45, "P": 22, "K": 18 },
      "rice": { "N": 45, "P": 18, "K": 18 },
      "maize": { "N": 55, "P": 28, "K": 22 },
      "cotton": { "N": 65, "P": 32, "K": 35 },
      "pulses": { "N": 18, "P": 12, "K": 12 }
    };

    const soilAdjustments = {
      "sandy": { "N": 1.1, "P": 1.2, "K": 1.1 },
      "loamy": { "N": 1.0, "P": 1.0, "K": 1.0 },
      "clay": { "N": 0.9, "P": 0.8, "K": 0.9 },
      "silt": { "N": 1.0, "P": 1.1, "K": 1.0 }
    };

    if (crop.toLowerCase() in fertReqs) {
      const req = fertReqs[crop.toLowerCase()];
      const adjustment = soilAdjustments[soilType.toLowerCase()] || soilAdjustments.loamy;

      return {
        "N": Math.round(req["N"] * area * adjustment.N),
        "P": Math.round(req["P"] * area * adjustment.P),
        "K": Math.round(req["K"] * area * adjustment.K)
      };
    } else {
      return "Crop not in database";
    }
  };

  const seedCalculator = (crop, soilType, area) => {
    const seedReqs = {
      "wheat": 45,
      "rice": 30,
      "maize": 9,
      "cotton": 1.5,
      "pulses": 10
    };

    const soilAdjustments = {
      "sandy": 1.1,
      "loamy": 1.0,
      "clay": 0.9,
      "silt": 1.0
    };

    if (crop.toLowerCase() in seedReqs) {
      const adjustment = soilAdjustments[soilType.toLowerCase()] || soilAdjustments.loamy;
      return { "seed": Math.round(seedReqs[crop.toLowerCase()] * area * adjustment) };
    } else {
      return "Crop not in database";
    }
  };

  const irrigationCalculator = (crop, soilType, area) => {
    const irrigationReqs = {
      "wheat": 1700000,
      "rice": 2800000,
      "maize": 2200000,
      "cotton": 2200000,
      "pulses": 1200000
    };

    const soilAdjustments = {
      "sandy": 1.2,
      "loamy": 1.0,
      "clay": 0.8,
      "silt": 1.0
    };

    if (crop.toLowerCase() in irrigationReqs) {
      const adjustment = soilAdjustments[soilType.toLowerCase()] || soilAdjustments.loamy;
      return { "water": Math.round(irrigationReqs[crop.toLowerCase()] * area * adjustment) };
    } else {
      return "Crop not in database";
    }
  };

  // Form Handlers
  const handleFertSubmit = (e) => {
    e.preventDefault();
    if (!fertForm.cropType || !fertForm.area || !fertForm.soilType) {
      alert('Please fill in all fields');
      return;
    }
    const result = fertilizerCalculator(fertForm.cropType, fertForm.soilType, parseFloat(fertForm.area));
    setFertResult(result);
  };

  const handleSeedSubmit = (e) => {
    e.preventDefault();
    if (!seedForm.cropType || !seedForm.area || !seedForm.soilType) {
      alert('Please fill in all fields');
      return;
    }
    const result = seedCalculator(seedForm.cropType, seedForm.soilType, parseFloat(seedForm.area));
    setSeedResult(result);
  };

  const handleIrrSubmit = (e) => {
    e.preventDefault();
    if (!irrForm.cropType || !irrForm.area || !irrForm.soilType) {
      alert('Please fill in all fields');
      return;
    }
    const result = irrigationCalculator(irrForm.cropType, irrForm.soilType, parseFloat(irrForm.area));
    setIrrResult(result);
  };

  return (
    <>
      <section className="container py-5">
        <h2 className="section-title">Farming Calculators</h2>
        <div className="row">
          
          {/* Fertilizer Calculator */}
          <div className="col-lg-4 col-md-6 mb-4">
            <div className="calculator-card">
              <div className="calculator-header">
                <i className="fas fa-flask fa-2x text-success"></i>
                <h4>Fertilizer Calculator</h4>
              </div>
              <p>Calculate the optimal amount of fertilizer for your crops</p>
              <form onSubmit={handleFertSubmit}>
                <div className="mb-3">
                  <label htmlFor="fertCropType" className="form-label">Crop Type</label>
                  <select 
                    className="form-select" 
                    id="fertCropType" 
                    value={fertForm.cropType}
                    onChange={(e) => setFertForm({...fertForm, cropType: e.target.value})}
                    required
                  >
                    <option value="">Select crop type</option>
                    <option value="wheat">Wheat</option>
                    <option value="rice">Rice</option>
                    <option value="maize">Maize</option>
                    <option value="cotton">Cotton</option>
                    <option value="pulses">Pulses</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label htmlFor="fertArea" className="form-label">Area (acres)</label>
                  <div className="input-group">
                    <input 
                      type="number" 
                      className="form-control" 
                      id="fertArea" 
                      step="0.1" 
                      min="0.1"
                      value={fertForm.area}
                      onChange={(e) => setFertForm({...fertForm, area: e.target.value})}
                      required 
                    />
                    <span className="input-group-text">acres</span>
                  </div>
                </div>
                <div className="mb-3">
                  <label htmlFor="fertSoilType" className="form-label">Soil Type</label>
                  <select 
                    className="form-select" 
                    id="fertSoilType"
                    value={fertForm.soilType}
                    onChange={(e) => setFertForm({...fertForm, soilType: e.target.value})}
                    required
                  >
                    <option value="">Select soil type</option>
                    <option value="sandy">Sandy</option>
                    <option value="loamy">Loamy</option>
                    <option value="clay">Clay</option>
                    <option value="silt">Silt</option>
                  </select>
                </div>
                <button type="submit" className="btn btn-success w-100">Calculate</button>
              </form>
              {fertResult && (
                <div className="result-box" style={{ display: 'block' }}>
                  <div className="result-title">Recommended Fertilizer:</div>
                  {typeof fertResult === 'string' ? (
                    <div className="text-danger">{fertResult}</div>
                  ) : (
                    <>
                      <div className="result-value">Nitrogen (N): {fertResult.N} kg</div>
                      <div className="result-value">Phosphorus (P): {fertResult.P} kg</div>
                      <div className="result-value">Potassium (K): {fertResult.K} kg</div>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Seed Calculator */}
          <div className="col-lg-4 col-md-6 mb-4">
            <div className="calculator-card">
              <div className="calculator-header">
                <i className="fas fa-seedling fa-2x text-success"></i>
                <h4>Seed Rate Calculator</h4>
              </div>
              <p>Know the optimal seed quantity for your planting area</p>
              <form onSubmit={handleSeedSubmit}>
                <div className="mb-3">
                  <label htmlFor="seedCropType" className="form-label">Crop Type</label>
                  <select 
                    className="form-select" 
                    id="seedCropType"
                    value={seedForm.cropType}
                    onChange={(e) => setSeedForm({...seedForm, cropType: e.target.value})}
                    required
                  >
                    <option value="">Select crop type</option>
                    <option value="wheat">Wheat</option>
                    <option value="rice">Rice</option>
                    <option value="maize">Maize</option>
                    <option value="cotton">Cotton</option>
                    <option value="pulses">Pulses</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label htmlFor="seedArea" className="form-label">Area (acres)</label>
                  <div className="input-group">
                    <input 
                      type="number" 
                      className="form-control" 
                      id="seedArea" 
                      step="0.1" 
                      min="0.1"
                      value={seedForm.area}
                      onChange={(e) => setSeedForm({...seedForm, area: e.target.value})}
                      required 
                    />
                    <span className="input-group-text">acres</span>
                  </div>
                </div>
                <div className="mb-3">
                  <label htmlFor="seedSoilType" className="form-label">Soil Type</label>
                  <select 
                    className="form-select" 
                    id="seedSoilType"
                    value={seedForm.soilType}
                    onChange={(e) => setSeedForm({...seedForm, soilType: e.target.value})}
                    required
                  >
                    <option value="">Select soil type</option>
                    <option value="sandy">Sandy</option>
                    <option value="loamy">Loamy</option>
                    <option value="clay">Clay</option>
                    <option value="silt">Silt</option>
                  </select>
                </div>
                <button type="submit" className="btn btn-success w-100">Calculate</button>
              </form>
              {seedResult && (
                <div className="result-box" style={{ display: 'block' }}>
                  <div className="result-title">Recommended Seed Quantity:</div>
                  {typeof seedResult === 'string' ? (
                    <div className="text-danger">{seedResult}</div>
                  ) : (
                    <div className="result-value">Seed Required: {seedResult.seed} kg</div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Irrigation Calculator */}
          <div className="col-lg-4 col-md-6 mb-4">
            <div className="calculator-card">
              <div className="calculator-header">
                <i className="fas fa-tint fa-2x text-success"></i>
                <h4>Irrigation Calculator</h4>
              </div>
              <p>Calculate total water requirements in field for your crops</p>
              <form onSubmit={handleIrrSubmit}>
                <div className="mb-3">
                  <label htmlFor="irrCropType" className="form-label">Crop Type</label>
                  <select 
                    className="form-select" 
                    id="irrCropType"
                    value={irrForm.cropType}
                    onChange={(e) => setIrrForm({...irrForm, cropType: e.target.value})}
                    required
                  >
                    <option value="">Select crop type</option>
                    <option value="wheat">Wheat</option>
                    <option value="rice">Rice</option>
                    <option value="maize">Maize</option>
                    <option value="cotton">Cotton</option>
                    <option value="pulses">Pulses</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label htmlFor="irrArea" className="form-label">Area (acres)</label>
                  <div className="input-group">
                    <input 
                      type="number" 
                      className="form-control" 
                      id="irrArea" 
                      step="0.1" 
                      min="0.1"
                      value={irrForm.area}
                      onChange={(e) => setIrrForm({...irrForm, area: e.target.value})}
                      required 
                    />
                    <span className="input-group-text">acres</span>
                  </div>
                </div>
                <div className="mb-3">
                  <label htmlFor="irrSoilType" className="form-label">Soil Type</label>
                  <select 
                    className="form-select" 
                    id="irrSoilType"
                    value={irrForm.soilType}
                    onChange={(e) => setIrrForm({...irrForm, soilType: e.target.value})}
                    required
                  >
                    <option value="">Select soil type</option>
                    <option value="sandy">Sandy</option>
                    <option value="loamy">Loamy</option>
                    <option value="clay">Clay</option>
                    <option value="silt">Silt</option>
                  </select>
                </div>
                <button type="submit" className="btn btn-success w-100">Calculate</button>
              </form>
              {irrResult && (
                <div className="result-box" style={{ display: 'block' }}>
                  <div className="result-title">Water Requirement:</div>
                  {typeof irrResult === 'string' ? (
                    <div className="text-danger">{irrResult}</div>
                  ) : (
                    <div className="result-value">Water Required: {irrResult.water.toLocaleString()} liters</div>
                  )}
                </div>
              )}
            </div>
          </div>

        </div>
      </section>

      <style>{`
        .section-title {
          color: #2c5530;
          text-align: center;
          margin: 30px 0;
          font-weight: 700;
        }
        .calculator-card {
          background: white;
          border-radius: 12px;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
          padding: 25px;
          height: 100%;
          transition: transform 0.3s ease;
        }
        .calculator-card:hover {
          transform: translateY(-5px);
        }
        .calculator-header {
          display: flex;
          align-items: center;
          margin-bottom: 15px;
        }
        .calculator-header i {
          margin-right: 10px;
        }
        .calculator-card h4 {
          color: #2c5530;
          margin-bottom: 10px;
        }
        .calculator-card p {
          color: #6c757d;
          margin-bottom: 20px;
        }
        .form-label {
          font-weight: 600;
          color: #495057;
        }
        .btn-success {
          background-color: #28a745;
          border-color: #28a745;
          font-weight: 600;
          padding: 10px;
        }
        .btn-success:hover {
          background-color: #218838;
          border-color: #1e7e34;
        }
        .result-box {
          background-color: #f8f9fa;
          border-radius: 8px;
          padding: 15px;
          margin-top: 20px;
          border-left: 4px solid #28a745;
        }
        .result-title {
          font-weight: 600;
          color: #2c5530;
          margin-bottom: 10px;
        }
        .result-value {
          font-size: 1.1rem;
          font-weight: 600;
          color: #495057;
        }
        .input-group-text {
          background-color: #e9ecef;
          color: #495057;
        }
      `}</style>
    </>
  );
};

export default FarmingCalculators;