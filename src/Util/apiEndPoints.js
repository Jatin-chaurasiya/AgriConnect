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

    // ================= Provider Service =================

    ADD_SERVICE: "/provider/addService",

    MY_SERVICES: "/provider/myServices",

    UPDATE_SERVICE: "/provider/updateService",

    DELETE_SERVICE: "/provider/deleteService",

    // ====================================================

    UPLOAD_IMAGES: `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
};