import axios from "../Util/axiosConfig";
import { API_ENDPOINTS } from "../Util/apiEndPoints";

export const createOrder = async (serviceId) => {

    const response = await axios.post(
        API_ENDPOINTS.CREATE_ORDER,
        {
            serviceId
        }
    );

    return response.data;
};