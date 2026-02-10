import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import statesDataList from "../data/statesData";

const LocationWeather = () => {
  const [statesData, setStatesData] = useState([]);
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [village, setVillage] = useState("");
  const [loading, setLoading] = useState(false);
  const [weatherData, setWeatherData] = useState(null);
  const [cities, setCities] = useState([]);

  useEffect(() => {
    setStatesData(statesDataList);
  }, []);

  // Update cities when state changes
  const handleStateChange = (e) => {
    const stateName = e.target.value;
    setSelectedState(stateName);
    setSelectedCity("");

    const stateObj = statesData.find((s) => s.name === stateName);
    if (stateObj) {
      setCities(stateObj.cities || []);
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedState || !selectedCity) {
      toast.error("Please select State and City");
      return;
    }

    setLoading(true);
    setWeatherData(null);

    const params = new URLSearchParams({
      state: selectedState,
      city: selectedCity,
      village: village,
    });

    try {
      const res = await fetch(`/api/weather?${params.toString()}`);
      const data = await res.json();
      setWeatherData(data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
      toast.error("Failed to fetch weather. Check API key or inputs.");
    }
  };

  // Clear form and results
  const handleClear = () => {
    setSelectedState("");
    setSelectedCity("");
    setVillage("");
    setCities([]);
    setWeatherData(null);
  };

  // Get hourly forecast data
  const getHourlyForecast = () => {
    if (!weatherData?.forecast?.list) return [];
    return weatherData.forecast.list.slice(0, 8).map((entry) => {
      const date = new Date(entry.dt * 1000);
      return {
        time: `${date.getHours()}:00`,
        temp: entry.main.temp.toFixed(1),
        desc: entry.weather[0].description,
      };
    });
  };

  // Get 5-day forecast data
  const getDailyForecast = () => {
    if (!weatherData?.forecast?.list) return [];

    const dailyMap = {};
    weatherData.forecast.list.forEach((entry) => {
      const date = new Date(entry.dt * 1000);
      const day = date.toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
      });
      if (!dailyMap[day]) dailyMap[day] = [];
      dailyMap[day].push(entry);
    });

    return Object.keys(dailyMap)
      .slice(0, 5)
      .map((day) => {
        const temps = dailyMap[day].map((e) => e.main.temp);
        const min = Math.min(...temps).toFixed(1);
        const max = Math.max(...temps).toFixed(1);
        return {
          day,
          min,
          max,
          desc: dailyMap[day][0].weather[0].description,
        };
      });
  };

  const locationName = village
    ? `${village}, ${selectedCity}, ${selectedState}`
    : `${selectedCity}, ${selectedState}`;

  return (
    <>
      <div className="container my-4">
        <div className="card shadow-sm border-0 rounded-3">
          <div className="card-header text-center">
            🌍 Get Location-Specific Weather Data
          </div>
          <div className="card-body">
            {/* Form */}
            <form onSubmit={handleSubmit} className="mb-3">
              <div className="row g-2">
                <div className="col-md-4">
                  <label className="form-label fw-semibold">State</label>
                  <select
                    className="form-select"
                    value={selectedState}
                    onChange={handleStateChange}
                    required
                  >
                    <option value="" disabled>
                      Select State
                    </option>
                    {statesData.map((state) => (
                      <option key={state.name} value={state.name}>
                        {state.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col-md-4">
                  <label className="form-label fw-semibold">
                    City/District
                  </label>
                  <select
                    className="form-select"
                    value={selectedCity}
                    onChange={(e) => setSelectedCity(e.target.value)}
                    disabled={!selectedState}
                    required
                  >
                    <option value="" disabled>
                      Select City
                    </option>
                    {cities.map((city) => (
                      <option key={city} value={city}>
                        {city}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col-md-4">
                  <label className="form-label fw-semibold">
                    Village (Optional)
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    value={village}
                    onChange={(e) => setVillage(e.target.value)}
                    placeholder="Enter village name"
                  />
                </div>
              </div>
              <div className="d-flex justify-content-center gap-2 mt-3">
                <button
                  type="submit"
                  className="btn text-white px-4"
                  style={{ backgroundColor: "#2D5016" }}
                >
                  ☁️ Get Weather Data
                </button>
                <button
                  type="button"
                  onClick={handleClear}
                  className="btn btn-outline-danger px-3"
                >
                  🧹 Clear
                </button>
              </div>
            </form>

            {/* Loading */}
            {loading && (
              <div className="text-center my-3">
                <div className="spinner-border text-success"></div>
                <p className="mt-2 mb-0">Fetching weather data...</p>
              </div>
            )}

            {/* Results */}
            {weatherData && !loading && (
              <div>
                <div className="card border rounded">
                  <div className="card-body">
                    <h5 className="card-title text-center">
                      Weather for <span>{locationName}</span>
                    </h5>
                    {weatherData.current && (
                      <>
                        <p className="text-center mb-2">
                          🌤️{" "}
                          <span>
                            {weatherData.current.main.temp.toFixed(1)}°C
                          </span>{" "}
                          <small>
                            {weatherData.current.weather[0].description}
                          </small>
                        </p>
                        <ul className="list-group list-group-flush mb-3">
                          <li className="list-group-item d-flex justify-content-between">
                            <span>🌬️ Wind</span>
                            <span>{weatherData.current.wind.speed} km/h</span>
                          </li>
                          <li className="list-group-item d-flex justify-content-between">
                            <span>💧 Humidity</span>
                            <span>{weatherData.current.main.humidity}%</span>
                          </li>
                          <li className="list-group-item d-flex justify-content-between">
                            <span>⏱ Pressure</span>
                            <span>{weatherData.current.main.pressure} hPa</span>
                          </li>
                        </ul>
                      </>
                    )}

                    {/* Hourly Forecast */}
                    <div className="mb-3">
                      <h6 className="text-primary text-center">
                        Today's Hourly Forecast
                      </h6>
                      <div className="row text-center">
                        {getHourlyForecast().map((hour, idx) => (
                          <div
                            key={idx}
                            className="col forecast-card card shadow-sm m-1 p-2"
                          >
                            <h6>{hour.time}</h6>
                            <p>🌡️ {hour.temp}°C</p>
                            <p>{hour.desc}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* 5-Day Forecast */}
                    <div>
                      <h6 className="text-success text-center">
                        5-Day Forecast
                      </h6>
                      <div className="row text-center">
                        {getDailyForecast().map((day, idx) => (
                          <div
                            key={idx}
                            className="col forecast-card card shadow-sm m-1 p-2"
                          >
                            <h6>{day.day}</h6>
                            <p>
                              🌡️ {day.min}°C - {day.max}°C
                            </p>
                            <p>{day.desc}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <style>{`
        .hourly-forecast {
          display: flex;
          flex-wrap: nowrap;
          gap: 12px;
          overflow-x: auto;
          padding: 8px;
          scroll-behavior: smooth;
          -webkit-overflow-scrolling: touch;
        }
        .hourly-forecast::-webkit-scrollbar { height: 6px; }
        .hourly-forecast::-webkit-scrollbar-thumb { background-color: #2D5016; border-radius: 3px; }
        .hourly-forecast::-webkit-scrollbar-track { background-color: #e9ecef; border-radius: 3px; }

        .hourly-card {
          flex: 0 0 auto;
          width: 80px;
          border-radius: 10px;
          background: #fff;
          text-align: center;
          padding: 8px 6px;
          box-shadow: 0 2px 6px rgba(0,0,0,0.1);
          transition: transform 0.2s, box-shadow 0.2s;
          cursor: pointer;
        }
        .hourly-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 6px 12px rgba(0,0,0,0.15);
        }
        .hourly-card h6 { font-size: 0.75rem; margin-bottom: 4px; color: #198754; }
        .hourly-card p { font-size: 0.7rem; margin: 0; color: #495057; }

        .forecast-card {
          border-radius: 10px;
          padding: 6px;
          box-shadow: 0 2px 6px rgba(0,0,0,0.1);
          margin-bottom: 8px;
          background: #fff;
        }
        .forecast-card h6 { font-size: 0.8rem; margin-bottom: 4px; color: #198754; }
        .forecast-card p { font-size: 0.75rem; margin: 0; color: #495057; }

        @media (max-width: 576px) { .hourly-card { width: 70px; } }
      `}</style>
    </>
  );
};

export default LocationWeather;
