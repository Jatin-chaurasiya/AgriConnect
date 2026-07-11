import { useEffect, useReducer } from "react";
import axiosInstance from "../Util/axiosConfig";
import { API_ENDPOINTS } from "../Util/apiEndPoints";
import { toast } from "react-toastify";
import {
  providerServiceReducer,
  initialState,
} from "../reducers/providerServiceReducer";

const useProviderService = () => {
  const [state, dispatch] = useReducer(providerServiceReducer, initialState);

  // ===========================
  // GET MY SERVICES
  // ===========================
  const getMyServices = async (
    page = state.currentPage,
    keyword = state.keyword,
  ) => {
    dispatch({
      type: "SET_LOADING",
      payload: true,
    });

    try {
      const response = await axiosInstance.get(API_ENDPOINTS.MY_SERVICES, {
        params: {
          page,
          size: state.pageSize,
          keyword,
        },
      });

      dispatch({
        type: "SET_SERVICES",
        payload: response.data,
      });
    } catch (error) {
      dispatch({
        type: "SET_ERROR",
        payload: error.response?.data?.message || "Failed to fetch services.",
      });

      toast.error(error.response?.data?.message || "Failed to fetch services.");
    } finally {
      dispatch({
        type: "SET_LOADING",
        payload: false,
      });
    }
  };
  // ===========================
  // ADD SERVICE
  // ===========================
  const addService = async (service) => {
    dispatch({
      type: "SET_LOADING",
      payload: true,
    });

    try {
      await axiosInstance.post(API_ENDPOINTS.ADD_SERVICE, service);

      toast.success("Service Added Successfully");

      await getMyServices(0);

      return true;
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to add service.");

      return false;
    } finally {
      dispatch({
        type: "SET_LOADING",
        payload: false,
      });
    }
  };

  // ===========================
  // UPDATE SERVICE
  // ===========================
  const updateService = async (id, service) => {
    dispatch({
      type: "SET_LOADING",
      payload: true,
    });

    try {
      await axiosInstance.put(`${API_ENDPOINTS.UPDATE_SERVICE}/${id}`, service);

      toast.success("Service Updated Successfully");

      await getMyServices(state.currentPage);

      return true;
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update service.");

      return false;
    } finally {
      dispatch({
        type: "SET_LOADING",
        payload: false,
      });
    }
  };

  // ===========================
  // DELETE SERVICE
  // ===========================
  const deleteService = async (id) => {
    dispatch({
      type: "SET_LOADING",
      payload: true,
    });

    try {
      await axiosInstance.delete(`${API_ENDPOINTS.DELETE_SERVICE}/${id}`);

      toast.success("Service Deleted Successfully");

      await getMyServices(state.currentPage);

      return true;
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete service.");

      return false;
    } finally {
      dispatch({
        type: "SET_LOADING",
        payload: false,
      });
    }
  };

  // ===========================
  // SEARCH
  // ===========================
  const searchService = async (keyword) => {
    dispatch({
      type: "SET_KEYWORD",
      payload: keyword,
    });

    await getMyServices(0, keyword);
  };

  // ===========================
  // PAGINATION
  // ===========================
  const changePage = async (page) => {
    dispatch({
      type: "SET_PAGE",
      payload: page,
    });

    await getMyServices(page, state.keyword);
  };

  useEffect(() => {
    getMyServices();
  }, []);

  return {
    state,

    getMyServices,

    addService,

    updateService,

    deleteService,

    searchService,

    changePage,
  };
};

export default useProviderService;
