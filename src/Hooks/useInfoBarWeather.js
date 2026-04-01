import { useState, useEffect } from "react";
import { BASE_URL, API_ENDPOINTS } from "../Util/apiEndPoints";

const DEFAULT_STATE = "Uttar Pradesh";
const DEFAULT_CITY = "Lucknow";

export const useInfoBarWeather = () => {
  const [infoBarData, setInfoBarData] = useState(null);
  const [infoBarLoading, setInfoBarLoading] = useState(true);

  useEffect(() => {
    const fetchDefault = async () => {
      try {
        const params = new URLSearchParams({
          state: DEFAULT_STATE,
          city: DEFAULT_CITY,
        });
        const res = await fetch(
          `${BASE_URL}${API_ENDPOINTS.WEATHER}?${params.toString()}`
        );
        if (!res.ok) throw new Error("InfoBar fetch failed");
        const data = await res.json();
        setInfoBarData(data);
      } catch (err) {
        console.error("InfoBar weather fetch error:", err);
      } finally {
        setInfoBarLoading(false);
      }
    };

    fetchDefault();
  }, []); 

  return { infoBarData, infoBarLoading };
};