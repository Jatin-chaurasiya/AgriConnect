import { useState, useEffect } from "react";
import { BASE_URL, API_ENDPOINTS } from "../Util/apiEndPoints";

const DEFAULT_STATE = "Uttar Pradesh";
const DEFAULT_CITY = "Lucknow";

const reverseGeocode = async (lat, lon) => {
  const res = await fetch(
    `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`
  );
  const data = await res.json();

  const address = data.address;

  const state =
    address.state || DEFAULT_STATE;

  const city =
    address.city ||
    address.town ||
    address.village ||
    address.county ||
    DEFAULT_CITY;

  return { state, city };
};

export const useInfoBarWeather = () => {
  const [infoBarData, setInfoBarData] = useState(null);
  const [infoBarLoading, setInfoBarLoading] = useState(true);
  const [locationError, setLocationError] = useState(null);

  useEffect(() => {
    const fetchWeatherForLocation = async (state, city) => {
      try {
        const params = new URLSearchParams({ state, city });
        const res = await fetch(
          `${BASE_URL}${API_ENDPOINTS.WEATHER}?${params.toString()}`
        );
        if (!res.ok) throw new Error("Weather fetch failed");
        const data = await res.json();
        setInfoBarData(data);
      } catch (err) {
        console.error("Weather API error:", err);
      } finally {
        setInfoBarLoading(false);
      }
    };

    const fetchWithGPS = () => {
      if (!navigator.geolocation) {
        // GPS support nahi → default use karo
        fetchWeatherForLocation(DEFAULT_STATE, DEFAULT_CITY);
        return;
      }

      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const { latitude, longitude } = position.coords;
            const { state, city } = await reverseGeocode(latitude, longitude);
            await fetchWeatherForLocation(state, city);
          } catch (err) {
            setLocationError("Location detect nahi ho saka");
            fetchWeatherForLocation(DEFAULT_STATE, DEFAULT_CITY);
          }
        },
        (err) => {
          setLocationError("Location permission denied");
          fetchWeatherForLocation(DEFAULT_STATE, DEFAULT_CITY);
        },
        {
          timeout: 8000,       
          maximumAge: 300000,  
        }
      );
    };

    fetchWithGPS();
  }, []);

  return { infoBarData, infoBarLoading, locationError };
};