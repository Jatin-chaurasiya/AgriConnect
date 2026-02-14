import React, { useState } from "react";

const ProfilePage = ({ userData }) => {
  const [mode, setMode] = useState("view");

  const [editModel, setEditModel] = useState({
    username: userData?.username || "",
    serviceProvider: userData?.serviceProvider || "No",
    language: userData?.language || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditModel((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdate = (e) => {
    e.preventDefault();

    // TODO: call API here
    console.log("Updated Data:", editModel);

    setMode("view");
  };

  return (
    <div className="container py-5">
      <div className="card shadow p-4">

        {/* VIEW MODE */}
        {mode === "view" && (
          <>
            <div className="text-center">
              <img
                src={
                  userData?.profileImage ||
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

            <p>
              <strong>Email:</strong> {userData?.email}
            </p>

            <p>
              <strong>Service Provide:</strong>{" "}
              {userData?.serviceProvider}
            </p>

            <p>
              <strong>Language:</strong> {userData?.language}
            </p>

            <div className="mt-3">
              <button
                className="btn btn-primary"
                onClick={() => setMode("edit")}
              >
                Edit Profile
              </button>
            </div>
          </>
        )}

        {/* EDIT MODE */}
        {mode === "edit" && (
          <>
            <h3 className="mb-3">Edit Profile</h3>

            <form onSubmit={handleUpdate}>
              <div className="mb-3">
                <label className="form-label">Name</label>
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
                <label className="form-label">
                  Service Provide
                </label>
                <select
                  name="serviceProvider"
                  value={editModel.serviceProvider}
                  onChange={handleChange}
                  className="form-control"
                  required
                >
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </div>

              <div className="mb-3">
                <label className="form-label">Language</label>
                <input
                  type="text"
                  name="language"
                  value={editModel.language}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </div>

              <button
                type="submit"
                className="btn btn-success me-2"
              >
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
