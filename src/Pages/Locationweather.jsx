import React from "react";
import { useLocationWeather } from "../Hooks/useLocationWeather";

const LocationWeather = () => {
  const {
    state,
    dispatch,
    handleStateChange,
    fetchWeather,
  } = useLocationWeather();

  const {
    statesData,
    selectedState,
    selectedCity,
    village,
    cities,
    loading,
    weatherData,
  } = state;

  const handleClear = () => {
    dispatch({ type: "RESET" });
  };

  return (
    <>
      <div className="container my-4">
        <div className="card shadow-sm border-0 rounded-3">
          <div className="card-header text-center">
            🌍 Get Location-Specific Weather Data
          </div>
          <div className="card-body">

            {/* Form */}
            <form onSubmit={fetchWeather}>
              <div className="row g-2">

                <div className="col-md-4">
                  <select
                    className="form-select"
                    value={selectedState}
                    onChange={(e) =>
                      handleStateChange(e.target.value)
                    }
                    required
                  >
                    <option value="">Select State</option>
                    {statesData.map((state) => (
                      <option key={state.name}>
                        {state.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="col-md-4">
                  <select
                    className="form-select"
                    value={selectedCity}
                    onChange={(e) =>
                      dispatch({
                        type: "SET_CITY",
                        payload: e.target.value,
                      })
                    }
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
                    onChange={(e) =>
                      dispatch({
                        type: "SET_VILLAGE",
                        payload: e.target.value,
                      })
                    }
                  />
                </div>
              </div>

              <div className="text-center mt-3">
                <button
                  type="submit"
                  className="btn text-white px-4"
                  style={{
                    backgroundColor: "#2D5016",
                  }}
                >
                  Get Weather
                </button>
                <button
                  type="button"
                  className="btn btn-outline-danger ms-2"
                  onClick={handleClear}
                >
                  Clear
                </button>
              </div>
            </form>

            {loading && (
              <div className="text-center mt-3">
                <div className="spinner-border text-success"></div>
              </div>
            )}

            {weatherData && !loading && (
              <div className="mt-4">
                <h5 className="text-center">
                  Weather for {selectedCity},{" "}
                  {selectedState}
                </h5>
                <p className="text-center">
                  🌡️{" "}
                  {weatherData.current.main.temp.toFixed(
                    1
                  )}
                  °C
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* SAME CSS */}
      <style>{`
        .forecast-card {
          border-radius: 10px;
          padding: 6px;
          box-shadow: 0 2px 6px rgba(0,0,0,0.1);
          background: #fff;
        }
      `}</style>
    </>
  );
};

export default LocationWeather;
