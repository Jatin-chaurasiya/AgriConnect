export const BASE_URL = "http://localhost:8080/api/v1.0"

const CLOUDINARY_CLOUD_NAME = "dgiigrvhu";

export const API_ENDPOINTS = {
    LOGIN: "/auth/login",
    REGISTER: "/auth/register",
    PROFILE:"/profile/me",

    UPLOAD_IMAGES: `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
}