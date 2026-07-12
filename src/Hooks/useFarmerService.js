import { useReducer, useCallback } from "react";
import axios from "../Util/axiosConfig";
import { API_ENDPOINTS } from "../Util/apiEndPoints";
import farmerServiceReducer, {
    initialState,
} from "../reducers/farmerServiceReducer";

const useFarmerService = () => {
    const [state, dispatch] = useReducer(
        farmerServiceReducer,
        initialState
    );

    // Get All Services
    const fetchServices = useCallback(
        async (page = 0, size = 3, keyword = "") => {
            dispatch({ type: "FETCH_SERVICES_REQUEST" });

            try {
                const response = await axios.get(API_ENDPOINTS.GET_ALL_SERVICES, {
                    params: {
                        page,
                        size,
                        keyword,
                    },
                });

                dispatch({
                    type: "FETCH_SERVICES_SUCCESS",
                    payload: response.data,
                });
            } catch (error) {
                dispatch({
                    type: "FETCH_SERVICES_FAILURE",
                    payload:
                        error.response?.data?.message ||
                        error.message ||
                        "Failed to fetch services",
                });
            }
        },
        []
    );

    // Get Service By Id
    const fetchServiceById = useCallback(async (id) => {
        dispatch({ type: "FETCH_SERVICE_BY_ID_REQUEST" });

        try {
            const response = await axios.get(
                `${API_ENDPOINTS.GET_SERVICE_BY_ID}/${id}`
            );

            dispatch({
                type: "FETCH_SERVICE_BY_ID_SUCCESS",
                payload: response.data,
            });
        } catch (error) {
            dispatch({
                type: "FETCH_SERVICE_BY_ID_FAILURE",
                payload:
                    error.response?.data?.message ||
                    error.message ||
                    "Failed to fetch service",
            });
        }
    }, []);

    // Clear Selected Service
    const clearSelectedService = () => {
        dispatch({
            type: "CLEAR_SELECTED_SERVICE",
        });
    };

    return {
        ...state,

        fetchServices,
        fetchServiceById,
        clearSelectedService,
    };
};

export default useFarmerService;