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

export const verifyPayment = async (bookingData) => {

    const response = await axios.post(
        API_ENDPOINTS.VERIFY_PAYMENT,
        bookingData
    );

    return response.data;
};

export const getMyBookings = async (
    page = 0,
    size = 3,
    keyword = ""
) => {

    const response = await axios.get(
        API_ENDPOINTS.MY_BOOKINGS,
        {
            params: {
                page,
                size,
                keyword,
            },
        }
    );

    return response.data;
};

export const cancelBooking = async (bookingId) => {

    const response = await axios.delete(
        `${API_ENDPOINTS.CANCEL_BOOKING}/${bookingId}`
    );

    return response.data;
};

// ================= Provider Booking Requests =================

export const getProviderBookingRequests = async (
    page = 0,
    size = 5
) => {

    const response = await axios.get(
        API_ENDPOINTS.PROVIDER_BOOKING_REQUESTS,
        {
            params: {
                page,
                size,
            },
        }
    );

    return response.data;
};

export const acceptBooking = async (bookingId) => {

    const response = await axios.put(
        `${API_ENDPOINTS.ACCEPT_BOOKING}/${bookingId}/accept`
    );

    return response.data;
};

export const rejectBooking = async (
    bookingId,
    reason
) => {

    const response = await axios.put(
        `${API_ENDPOINTS.REJECT_BOOKING}/${bookingId}/reject`,
        {
            reason,
        }
    );

    return response.data;
};

export const completeBooking = async (bookingId) => {

    const response = await axios.put(
        `${API_ENDPOINTS.COMPLETE_BOOKING}/${bookingId}/complete`
    );

    return response.data;
};
export const getBookingHistory = async (
    page = 0,
    size = 3
) => {

    const response = await axios.get(
        API_ENDPOINTS.PROVIDER_BOOKING_HISTORY,
        {
            params: {
                page,
                size,
            },
        }
    );

    return response.data;
};