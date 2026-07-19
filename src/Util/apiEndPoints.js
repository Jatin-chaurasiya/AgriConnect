// export const BASE_URL = "https://agriconnect-backend-v2-production.up.railway.app/api/v1.0";
export const BASE_URL = "http://localhost:8080/api/v1.0";

const CLOUDINARY_CLOUD_NAME = "dgiigrvhu";

export const API_ENDPOINTS = {
  LOGIN: "/auth/login",
  REGISTER: "/auth/register",
  PROFILE: "/profile/me",
  WEATHER: "/weather",
  CHATWIDGET: "/chat/send",
  SCHEMES: "/schemes",

  CROP_RECOMMENDATION: "/api/crop/predict",
  CROP_PLANNER: "/crop-planner",

  // ================= Provider Service =================

  ADD_SERVICE: "/provider/addService",

  MY_SERVICES: "/provider/myServices",

  UPDATE_SERVICE: "/provider/updateService",

  DELETE_SERVICE: "/provider/deleteService",

  // ================= Farmer Service =================

  GET_ALL_SERVICES: "/services",

  GET_SERVICE_BY_ID: "/services",
  CREATE_ORDER: "/bookings/create-order",
  VERIFY_PAYMENT: "/bookings/verify-payment",
  MY_BOOKINGS: "/bookings/myBookings",
  CANCEL_BOOKING: "/bookings",
  // ================= Provider Booking =================

  PROVIDER_BOOKING_REQUESTS: "/bookings/provider/bookingRequests",

  ACCEPT_BOOKING: "/bookings/provider/booking",

  REJECT_BOOKING: "/bookings/provider/booking",

  COMPLETE_BOOKING: "/bookings/provider/booking",
  
  PROVIDER_BOOKING_HISTORY: "/bookings/provider/bookingHistory",

  UPLOAD_IMAGES: `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
};
