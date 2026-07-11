import React, { useEffect, useState } from "react";
import uploadProfileImage from "../../Util/uploadProfileImage";

const initialForm = {
  serviceName: "",
  category: "",
  description: "",
  price: "",
  unit: "",
  district: "",
  experience: "",
  imageUrl: "",
  availability: true,
};

const AddServiceModal = ({
  show,
  handleClose,
  onSubmit,
  editData = null,
  loading,
}) => {
  const [formData, setFormData] = useState(initialForm);
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState("");

  useEffect(() => {
    if (editData) {
      setFormData(editData);
      setPreview(editData.imageUrl || "");
    } else {
      setFormData(initialForm);
      setPreview("");
    }
  }, [editData, show]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const submit = async (e) => {
    e.preventDefault();
    await onSubmit(formData);
  };
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];

    if (!file) return;

    try {
      setUploading(true);

      const imageUrl = await uploadProfileImage(file);

      setFormData((prev) => ({
        ...prev,
        imageUrl,
      }));

      setPreview(imageUrl);
    } catch (error) {
      alert(error.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div
      className={`modal fade ${show ? "show d-block" : ""}`}
      tabIndex="-1"
      style={{ background: "rgba(0,0,0,.5)" }}
    >
      <div className="modal-dialog modal-lg modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header bg-success text-white">
            <h5 className="modal-title">
              {editData ? "Update Service" : "Add Service"}
            </h5>

            <button
              type="button"
              className="btn-close btn-close-white"
              onClick={handleClose}
              disabled={loading}
            />
          </div>

          <form onSubmit={submit}>
            <div className="modal-body">
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label">Service Name</label>

                  <input
                    type="text"
                    className="form-control"
                    name="serviceName"
                    maxLength={100}
                    value={formData.serviceName}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <label className="form-label">Category</label>

                  <select
                    className="form-select"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Category</option>

                    <option>Tractor Rental</option>

                    <option>Harvesting</option>

                    <option>Soil Testing</option>

                    <option>Crop Spraying</option>

                    <option>Seed Supply</option>

                    <option>Fertilizer Supply</option>

                    <option>Pesticide Supply</option>

                    <option>Equipment Repair</option>

                    <option>Transportation</option>

                    <option>Irrigation</option>

                    <option>Other</option>
                  </select>
                </div>

                <div className="col-12 mb-3">
                  <label className="form-label">Description</label>

                  <textarea
                    rows="3"
                    className="form-control"
                    name="description"
                    maxLength={500}
                    value={formData.description}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <label className="form-label">Price</label>

                  <input
                    type="number"
                    className="form-control"
                    name="price"
                    min="1"
                    value={formData.price}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <label className="form-label">Unit</label>

                  <input
                    type="text"
                    className="form-control"
                    name="unit"
                    placeholder="Hour / Acre / Kg"
                    value={formData.unit}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <label className="form-label">District</label>

                  <input
                    type="text"
                    className="form-control"
                    name="district"
                    value={formData.district}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <label className="form-label">Experience</label>

                  <input
                    type="text"
                    className="form-control"
                    name="experience"
                    placeholder="e.g. 5 Years"
                    value={formData.experience}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-12 mb-3">
                  <label className="form-label">Service Image</label>

                  <input
                    type="file"
                    className="form-control"
                    accept="image/*"
                    onChange={handleImageUpload}
                  />

                  {uploading && (
                    <small className="text-primary">Uploading Image...</small>
                  )}

                  {preview && (
                    <img
                      src={preview}
                      alt="Preview"
                      className="img-thumbnail mt-3"
                      style={{
                        width: "180px",
                        height: "120px",
                        objectFit: "cover",
                      }}
                    />
                  )}
                </div>

                <div className="col-12">
                  <div className="form-check form-switch">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      name="availability"
                      checked={formData.availability}
                      onChange={handleChange}
                    />

                    <label className="form-check-label">Available</label>
                  </div>
                </div>
              </div>
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={handleClose}
                disabled={loading}
              >
                Cancel
              </button>

              <button
                type="submit"
                className="btn btn-success"
                disabled={loading || uploading}
              >
                {uploading
                  ? "Uploading..."
                  : loading
                    ? "Please Wait..."
                    : editData
                      ? "Update Service"
                      : "Add Service"}
                {loading
                  ? "Please Wait..."
                  : editData
                    ? "Update Service"
                    : "Add Service"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddServiceModal;
