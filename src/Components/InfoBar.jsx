import React from "react";
import { useInfoBarWeather } from "../Hooks/useInfoBarWeather";
import { useTranslation } from "react-i18next";

const InfoBar = () => {
  const { t } = useTranslation();
  const { infoBarData, infoBarLoading, locationError } = useInfoBarWeather();

  const temp = infoBarLoading ? "--" : (infoBarData?.temperature ?? "--");
  const humidity = infoBarLoading ? "--" : (infoBarData?.humidity ?? "--");
  const wind = infoBarLoading ? "--" : (infoBarData?.windSpeed ?? "--");
  const location = infoBarLoading
    ? t("weather.detectingLocation")
    : (infoBarData?.location ?? "--");

  return (
    <div
      className="info-bar py-3 text-white"
      style={{ backgroundColor: "#2D5016" }}
    >
      <div
        className="container d-flex flex-wrap justify-content-between align-items-center"
        style={{ border: "1px solid #1b2d12" }}
      >
        {/* Temperature */}
        <div className="info-item d-flex align-items-center mb-2 mb-md-0">
          <div className="info-icon me-2">
            <i className="fas fa-thermometer-half fa-2x text-warning"></i>
          </div>
          <div className="info-text">
            <div className="small">{t("weather.temperature")}</div>
            <div className="fw-bold">{temp}°C</div>
          </div>
        </div>

        {/* Humidity */}
        <div className="info-item d-flex align-items-center mb-2 mb-md-0">
          <div className="info-icon me-2">
            <i className="fas fa-tint fa-2x text-warning"></i>
          </div>
          <div className="info-text">
            <div className="small">{t("weather.humidity")}</div>
            <div className="fw-bold">{humidity}%</div>
          </div>
        </div>

        {/* Wind Speed */}
        <div className="info-item d-flex align-items-center mb-2 mb-md-0">
          <div className="info-icon me-2">
            <i className="fas fa-wind fa-2x text-warning"></i>
          </div>
          <div className="info-text">
            <div className="small">{t("weather.windSpeed")}</div>
            <div className="fw-bold">{wind} km/h</div>
          </div>
        </div>

        {/* Location */}
        <div className="info-item d-flex align-items-center mb-2 mb-md-0">
          <div className="info-icon me-2">
            <i className="fas fa-map-marker-alt fa-2x text-warning"></i>
          </div>
          <div className="info-text">
            <div className="small">
              {t("weather.location")}
              {locationError && (
                <span className="text-warning-emphasis">
                  ({t("weather.permissionDenied")})
                </span>
              )}
            </div>
            <div className="fw-bold">{location}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoBar;
