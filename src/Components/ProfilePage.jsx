import React, { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL, API_ENDPOINTS } from "../Util/apiEndpoints";

const ProfilePage = () => {
  const [mode, setMode] = useState("view");
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);

  const [editModel, setEditModel] = useState({
    username: "",
    language: "",
    profileImageUrl: "",
  });

  // 🔐 Axios instance with token
  const api = axios.create({
    baseURL: BASE_URL,
  });

  api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  // 🔥 Fetch Profile
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await api.get(API_ENDPOINTS.PROFILE);

        setUserData(response.data);

        setEditModel({
          username: response.data.username,
          language: response.data.language,
          profileImageUrl: response.data.profileImageUrl,
        });
      } catch (error) {
        console.error("Profile fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  // 📝 Handle Input Change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditModel((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ☁️ Upload Image to Cloudinary
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "your_upload_preset"); // replace

    try {
      const res = await fetch(API_ENDPOINTS.UPLOAD_IMAGES, {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      setEditModel((prev) => ({
        ...prev,
        profileImageUrl: data.secure_url,
      }));
    } catch (error) {
      console.error("Image upload error:", error);
    }
  };

  // 🔄 Update Profile
  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const response = await api.put(API_ENDPOINTS.PROFILE, editModel);

      setUserData(response.data);
      setMode("view");
    } catch (error) {
      console.error("Update error:", error);
    }
  };

  if (loading) return <p className="text-center mt-5">Loading...</p>;

  return (
    <div className="container py-5">
      <div className="card shadow p-4">

        {mode === "view" && (
          <>
            <div className="text-center">
              <img
                src={
                  userData?.profileImageUrl ||
                  "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                }
                className="rounded-circle mb-3"
                width="120"
                height="120"
                alt="Profile"
              />
              <h3>{userData?.username}</h3>
            </div>

            <hr />

            <p><strong>Email:</strong> {userData?.email}</p>
            <p><strong>Language:</strong> {userData?.language}</p>
            <p><strong>Role:</strong> {userData?.role}</p>

            <button
              className="btn btn-primary"
              onClick={() => setMode("edit")}
            >
              Edit Profile
            </button>
          </>
        )}

        {mode === "edit" && (
          <>
            <h3 className="mb-3">Edit Profile</h3>

            <form onSubmit={handleUpdate}>

              <div className="mb-3 text-center">
                <img
                  src={
                    editModel.profileImageUrl ||
                    "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                  }
                  className="rounded-circle mb-2"
                  width="120"
                  height="120"
                  alt="Preview"
                />
                <input
                  type="file"
                  className="form-control mt-2"
                  onChange={handleImageUpload}
                />
              </div>

              <div className="mb-3">
                <label>Name</label>
                <input
                  type="text"
                  name="username"
                  value={editModel.username}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </div>

              <div className="mb-3">
                <label>Language</label>
                <input
                  type="text"
                  name="language"
                  value={editModel.language}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </div>

              <button type="submit" className="btn btn-success me-2">
                Update
              </button>

              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => setMode("view")}
              >
                Cancel
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
