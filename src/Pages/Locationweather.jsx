import React from "react";
import { useLocationWeather } from "../Hooks/useLocationWeather";

const LocationWeather = () => {
  const { state, dispatch, handleStateChange, fetchWeather } = useLocationWeather();

  const {
    statesData, selectedState, selectedCity,
    village, cities, loading, weatherData,
  } = state;

  const handleClear = () => dispatch({ type: "RESET" });

  return (
    <>
      <div className="container my-4">
        <div className="card shadow-sm border-0 rounded-3">

          <div className="card-header text-center fw-semibold">
            🌍 Get Location-Specific Weather Data
          </div>

          <div className="card-body">

            {/* ── Form ── */}
            <form onSubmit={fetchWeather}>
              <div className="row g-2">
                <div className="col-md-4">
                  <select
                    className="form-select"
                    value={selectedState}
                    onChange={(e) => handleStateChange(e.target.value)}
                    required
                  >
                    <option value="">Select State</option>
                    {statesData.map((s) => (
                      <option key={s.name}>{s.name}</option>
                    ))}
                  </select>
                </div>

                <div className="col-md-4">
                  <select
                    className="form-select"
                    value={selectedCity}
                    onChange={(e) => dispatch({ type: "SET_CITY", payload: e.target.value })}
                    disabled={!selectedState}
                    required
                  >
                    <option value="">Select City</option>
                    {cities.map((city) => (
                      <option key={city}>{city}</option>
                    ))}
                  </select>
                </div>

                <div className="col-md-4">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Village (Optional)"
                    value={village}
                    onChange={(e) => dispatch({ type: "SET_VILLAGE", payload: e.target.value })}
                  />
                </div>
              </div>

              <div className="text-center mt-3">
                <button
                  type="submit"
                  className="btn text-white px-4"
                  style={{ backgroundColor: "#2D5016" }}
                >
                  ☁️ Get Weather Data
                </button>
                <button
                  type="button"
                  className="btn btn-outline-danger ms-2"
                  onClick={handleClear}
                >
                  ✏️ Clear
                </button>
              </div>
            </form>

            {/* ── Loader ── */}
            {loading && (
              <div className="text-center mt-3">
                <div className="spinner-border text-success"></div>
              </div>
            )}

            {/* ── Weather Display ── */}
            {weatherData && !loading && (
              <div className="mt-4">

                {/* Title */}
                <h5 className="text-center fw-bold" style={{ color: "#2D5016" }}>
                  Weather for {weatherData.location}
                </h5>

                <p className="text-center text-muted">
                  🌤️ {weatherData.temperature.toFixed(1)}°C &nbsp;{weatherData.description}
                </p>

                {/* Wind, Humidity, Pressure */}
                <div className="card border-0 shadow-sm rounded-3 mb-3">
                  <div className="card-body p-0">

                    <div className="d-flex justify-content-between align-items-center px-4 py-2 border-bottom">
                      <span>🌬️ Wind</span>
                      <span className="fw-semibold">{weatherData.windSpeed} km/h</span>
                    </div>

                    <div className="d-flex justify-content-between align-items-center px-4 py-2 border-bottom">
                      <span>💧 Humidity</span>
                      <span className="fw-semibold">{weatherData.humidity}%</span>
                    </div>

                    <div className="d-flex justify-content-between align-items-center px-4 py-2">
                      <span>⏱ Pressure</span>
                      <span className="fw-semibold">{weatherData.pressure} hPa</span>
                    </div>

                  </div>
                </div>

                {/* Today's Hourly Forecast */}
                {weatherData.hourlyForecast?.length > 0 && (
                  <div className="mb-3">
                    <h6 className="text-center fw-semibold" style={{ color: "#1565C0" }}>
                      Today's Hourly Forecast
                    </h6>
                    <div className="d-flex overflow-auto gap-2 pb-1">
                      {weatherData.hourlyForecast.map((h, i) => (
                        <div key={i} className="forecast-card text-center flex-shrink-0" style={{ minWidth: "90px" }}>
                          <div className="fw-bold">{h.time}</div>
                          <div>🌡️ {h.temperature.toFixed(1)}°C</div>
                          <div className="text-muted small">{h.description}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 5-Day Forecast */}
                {weatherData.fiveDayForecast?.length > 0 && (
                  <div>
                    <h6 className="text-center fw-semibold" style={{ color: "#1565C0" }}>
                      5-Day Forecast
                    </h6>
                    <div className="d-flex overflow-auto gap-2 pb-1">
                      {weatherData.fiveDayForecast.map((d, i) => (
                        <div key={i} className="forecast-card text-center flex-shrink-0" style={{ minWidth: "120px" }}>
                          <div className="fw-bold">{d.date}</div>
                          <div>🌡️ {d.minTemp.toFixed(1)}°C - {d.maxTemp.toFixed(1)}°C</div>
                          <div className="text-muted small">{d.description}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

              </div>
            )}

          </div>
        </div>
      </div>

      <style>{`
        .forecast-card {
          border-radius: 10px;
          padding: 10px;
          box-shadow: 0 2px 6px rgba(0,0,0,0.1);
          background: #fff;
        }
      `}</style>
    </>
  );
};

export default LocationWeather;