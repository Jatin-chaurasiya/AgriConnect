import { API_ENDPOINTS } from "./apiEndpoints";

const CLOUDINARY_UPLOAD_PRESET = "AgriConnect";

const uploadProfileImage = async (image) => {
  if (!image) {
    throw new Error("No image selected");
  }

  if (!image.type.startsWith("image/")) {
    throw new Error("Only image files are allowed");
  }

  if (image.size > 5 * 1024 * 1024) {
    throw new Error("Image size must be less than 5MB");
  }

  const formData = new FormData();
  formData.append("file", image);
  formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

  try {
    const response = await fetch(API_ENDPOINTS.UPLOAD_IMAGES, {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    if (!response.ok) {
      const errorMessage =
        data?.error?.message || response.statusText || "Image upload failed";

      throw new Error(`Cloudinary upload failed: ${errorMessage}`);
    }

    return data.secure_url;
  } catch (error) {
    console.error("Error uploading image:", error.message);
    throw error;
  }
};

export default uploadProfileImage;
