import React from 'react';

const InfoBar = ({ weatherData = {} }) => {
  const {
    temperature = '28°C',
    humidity = '65%',
    rainfall = '12mm',
    windSpeed = '8 km/h'
  } = weatherData;

  return (
    <div className="info-bar py-3 text-white" style={{ backgroundColor: '#2D5016' }}>
      <div 
        className="container d-flex flex-wrap justify-content-between align-items-center" 
        style={{ border: '1px solid #1b2d12' }}
      >
        {/* Temperature */}
        <div className="info-item d-flex align-items-center mb-2 mb-md-0">
          <div className="info-icon me-2">
            <i className="fas fa-thermometer-half fa-2x text-warning"></i>
          </div>
          <div className="info-text">
            <div className="small">Temperature</div>
            <div className="fw-bold">{temperature}</div>
          </div>
        </div>

        {/* Humidity */}
        <div className="info-item d-flex align-items-center mb-2 mb-md-0">
          <div className="info-icon me-2">
            <i className="fas fa-tint fa-2x text-warning"></i>
          </div>
          <div className="info-text">
            <div className="small">Humidity</div>
            <div className="fw-bold">{humidity}</div>
          </div>
        </div>

        {/* Rainfall */}
        <div className="info-item d-flex align-items-center mb-2 mb-md-0">
          <div className="info-icon me-2">
            <i className="fas fa-cloud-showers-heavy fa-2x text-warning"></i>
          </div>
          <div className="info-text">
            <div className="small">Rainfall</div>
            <div className="fw-bold">{rainfall}</div>
          </div>
        </div>

        {/* Wind Speed */}
        <div className="info-item d-flex align-items-center mb-2 mb-md-0">
          <div className="info-icon me-2">
            <i className="fas fa-wind fa-2x text-warning"></i>
          </div>
          <div className="info-text">
            <div className="small">Wind Speed</div>
            <div className="fw-bold">{windSpeed}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoBar;