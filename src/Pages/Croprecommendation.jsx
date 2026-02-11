import React, { useState } from 'react';
import { toast } from 'react-toastify';

const CropRecommendation = () => {
  const [formData, setFormData] = useState({
    nitrogen: '',
    phosphorus: '',
    potassium: '',
    temperature: '',
    humidity: '',
    ph: '',
    rainfall: ''
  });
  const [loading, setLoading] = useState(false);
  const [recommendedCrop, setRecommendedCrop] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setRecommendedCrop(null);

    try {
      const response = await fetch('/recommend', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        const data = await response.json();
        setRecommendedCrop(data.recommendedCrop || data.crop || data);
        toast.success('Crop recommendation generated successfully!');
      } else {
        toast.error('Failed to get recommendation. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFormData({
      nitrogen: '',
      phosphorus: '',
      potassium: '',
      temperature: '',
      humidity: '',
      ph: '',
      rainfall: ''
    });
    setRecommendedCrop(null);
  };

  return (
    <>
      {/* Hero Section */}
      <section className="hero-section" style={{ backgroundColor: '#2D5016' }}>
        <div className="container text-center">
          <h1 className="display-4 fw-bold mb-3 text-white">AI-Powered Crop Recommendation</h1>
          <p className="lead mb-4 text-white">Get personalized crop suggestions based on your soil, climate, and farming conditions</p>
          <div className="d-flex justify-content-center gap-3">
            <span className="badge bg-light text-success p-2">
              <i className="fas fa-seedling me-1"></i> Increase Yield
            </span>
            <span className="badge bg-light text-success p-2">
              <i className="fas fa-cloud-sun me-1"></i> Climate Appropriate
            </span>
            <span className="badge bg-light text-success p-2">
              <i className="fas fa-chart-line me-1"></i> Maximize Profit
            </span>
          </div>
        </div>
      </section>

      {/* Recommendation Form */}
      <div className="container my-5">
        <div className="recommendation-form">
          <h2 className="mb-4 text-center">Tell Us About Your Farm</h2>
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-md-4 mb-3">
                <label htmlFor="nitrogen" className="form-label">
                  Nitrogen (N) Content <span className="text-muted">- Integer value</span>
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="nitrogen"
                  name="nitrogen"
                  value={formData.nitrogen}
                  onChange={handleChange}
                  placeholder="Enter N value (e.g., 50)"
                  min="0"
                  max="140"
                  step="1"
                  required
                />
                <div className="form-text">Required format: Integer (e.g., 25, 50, 75)</div>
              </div>
              <div className="col-md-4 mb-3">
                <label htmlFor="phosphorus" className="form-label">
                  Phosphorus (P) Content <span className="text-muted">- Integer value</span>
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="phosphorus"
                  name="phosphorus"
                  value={formData.phosphorus}
                  onChange={handleChange}
                  placeholder="Enter P value (e.g., 40)"
                  min="0"
                  max="140"
                  step="1"
                  required
                />
                <div className="form-text">Required format: Integer (e.g., 30, 45, 60)</div>
              </div>
              <div className="col-md-4 mb-3">
                <label htmlFor="potassium" className="form-label">
                  Potassium (K) Content <span className="text-muted">- Integer value</span>
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="potassium"
                  name="potassium"
                  value={formData.potassium}
                  onChange={handleChange}
                  placeholder="Enter K value (e.g., 35)"
                  min="0"
                  max="140"
                  step="1"
                  required
                />
                <div className="form-text">Required format: Integer (e.g., 20, 35, 50)</div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-6 mb-3">
                <label htmlFor="temperature" className="form-label">
                  Temperature <span className="text-muted">- Float value (°C)</span>
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="temperature"
                  name="temperature"
                  value={formData.temperature}
                  onChange={handleChange}
                  placeholder="Enter temperature (e.g., 25.5)"
                  min="-10"
                  max="50"
                  step="0.1"
                  required
                />
                <div className="form-text">Required format: Float (e.g., 20.5, 25.0, 30.2)</div>
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="humidity" className="form-label">
                  Relative Humidity <span className="text-muted">- Float value (%)</span>
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="humidity"
                  name="humidity"
                  value={formData.humidity}
                  onChange={handleChange}
                  placeholder="Enter humidity (e.g., 65.5)"
                  min="0"
                  max="100"
                  step="0.1"
                  required
                />
                <div className="form-text">Required format: Float (e.g., 50.0, 65.5, 80.2)</div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-6 mb-3">
                <label htmlFor="ph" className="form-label">
                  Soil pH Level <span className="text-muted">- Float value</span>
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="ph"
                  name="ph"
                  value={formData.ph}
                  onChange={handleChange}
                  placeholder="Enter pH (e.g., 6.5)"
                  min="4.0"
                  max="9.0"
                  step="0.1"
                  required
                />
                <div className="form-text">Required format: Float (e.g., 5.5, 6.5, 7.2) - Range: 4.0 to 9.0</div>
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="rainfall" className="form-label">
                  Rainfall <span className="text-muted">- Float value (mm)</span>
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="rainfall"
                  name="rainfall"
                  value={formData.rainfall}
                  onChange={handleChange}
                  placeholder="Enter rainfall (e.g., 150.5)"
                  min="0"
                  step="0.1"
                  required
                />
                <div className="form-text">Required format: Float (e.g., 100.0, 150.5, 200.2)</div>
              </div>
            </div>

            <div className="alert alert-info mt-3">
              <h6>
                <i className="fas fa-info-circle me-2"></i>Data Format Requirements
              </h6>
              <small>
                <strong>N, P, K:</strong> Integer values (e.g., 25, 50, 75)<br />
                <strong>Temperature, Humidity, pH, Rainfall:</strong> Float values (e.g., 25.5, 65.0, 6.5, 150.2)
              </small>
            </div>

            <div className="text-center mt-4">
              <button type="submit" className="btn btn-primary btn-lg px-5" disabled={loading}>
                {loading ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2"></span>
                    Processing...
                  </>
                ) : (
                  <>
                    <i className="fas fa-search me-2"></i> Get Crop Recommendations
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Result Section */}
        {recommendedCrop && (
          <div className="result-section mt-5">
            <h2 className="mb-4 text-center">Recommended Crops</h2>
            <p className="text-center text-muted mb-4">Based on your inputs, here are the best crops for your farm</p>

            <div className="row justify-content-center">
              <div className="col-md-4">
                <div className="crop-card">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <h4>{recommendedCrop}</h4>
                    <span className="badge bg-success">Highly Suitable</span>
                  </div>
                  <p className="text-muted">Best crop for your soil and weather.</p>
                </div>
              </div>
            </div>

            <div className="text-center mt-4">
              <button onClick={handleReset} className="btn btn-success">
                <i className="fas fa-redo me-2"></i> Start New Recommendation
              </button>
            </div>
          </div>
        )}
      </div>

      <style>{`
        .hero-section {
          padding: 60px 0;
          margin-bottom: 40px;
        }

        .recommendation-form {
          background: #fff;
          padding: 30px;
          border-radius: 10px;
          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }

        .crop-card {
          background: #fff;
          padding: 25px;
          border-radius: 10px;
          box-shadow: 0 4px 15px rgba(0,0,0,0.1);
          border-left: 4px solid #28a745;
        }

        .crop-card h4 {
          color: #2D5016;
          font-weight: 600;
        }

        .result-section {
          background: #f8f9fa;
          padding: 40px 20px;
          border-radius: 10px;
        }

        .form-text {
          font-size: 0.875rem;
          color: #6c757d;
        }

        .alert-info {
          background-color: #e7f3ff;
          border-color: #b8daff;
        }
      `}</style>
    </>
  );
};

export default CropRecommendation;