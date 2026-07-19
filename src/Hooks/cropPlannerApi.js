import axios from "../Util/axiosConfig";
import { API_ENDPOINTS } from "../Util/apiEndPoints";

export const getCropPlanner = async (cropName, token) => {
  const response = await axios.post(
    API_ENDPOINTS.CROP_PLANNER,
    { cropName },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};