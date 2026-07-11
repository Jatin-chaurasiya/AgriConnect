import React, { useState } from "react";
import useProviderService from "../../Hooks/useProviderService";
import { FaPlus, FaEdit, FaTrash, FaSearch } from "react-icons/fa";
import AddServiceModal from "./AddServiceModal";
import Swal from "sweetalert2";

const AddService = () => {
  const [showModal, setShowModal] = useState(false);
  const [editData, setEditData] = useState(null);
  const {
    state,
    addService,
    updateService,
    deleteService,
    searchService,
    changePage,
  } = useProviderService();

  const handleAddClick = () => {
    setEditData(null);
    setShowModal(true);
  };

  const handleEdit = (service) => {
    setEditData(service);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Delete Service?",
      text: "This service will be permanently deleted.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#198754",
      cancelButtonColor: "#dc3545",
      confirmButtonText: "Yes, Delete",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      await deleteService(id);
    }
  };

  const handleSubmit = async (data) => {
    let success = false;
    if (editData) {
      success = await updateService(editData.id, data);
    } else {
      success = await addService(data);
    }
    if (success) {
      setShowModal(false);
      setEditData(null);
    }
  };

  return (
    <div className="container py-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="fw-bold text-success">My Agricultural Services</h2>

          <p className="text-muted">
            Manage all your agricultural services here.
          </p>
        </div>

        <button className="btn btn-success" onClick={handleAddClick}>
          <FaPlus className="me-2" />
          Add Service
        </button>
      </div>

      <div className="input-group mb-4">
        <span className="input-group-text">
          <FaSearch />
        </span>

        <input
          className="form-control"
          placeholder="Search Service..."
          value={state.keyword}
          onChange={(e) => searchService(e.target.value)}
        />
      </div>
      {/* Loading */}

      {state.loading && (
        <div className="text-center my-5">
          <div className="spinner-border text-success" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>

          <p className="mt-3 text-success fw-semibold">Loading Services...</p>
        </div>
      )}

      {/* Error */}

      {state.error && (
        <div className="alert alert-danger text-center">{state.error}</div>
      )}

      {!state.loading && !state.error && (
        <div className="row">
          {state.services.length > 0 ? (
            state.services.map((service) => (
              <div className="col-lg-4 mb-4" key={service.id}>
                <div className="card shadow-sm h-100">
                  <img
                    src={
                      service.imageUrl ||
                      "https://placehold.co/600x400?text=No+Image"
                    }
                    className="card-img-top"
                    alt={service.serviceName}
                    style={{
                      height: "220px",
                      objectFit: "cover",
                    }}
                  />

                  <div className="card-body">
                    <h5 className="fw-bold">{service.serviceName}</h5>

                    <span className="badge bg-success mb-2">
                      {service.category}
                    </span>

                    <p>{service.description}</p>

                    <p>
                      <strong>Price :</strong> ₹{service.price}/{service.unit}
                    </p>

                    <p>
                      <strong>District :</strong> {service.district}
                    </p>

                    <p>
                      <strong>Experience :</strong> {service.experience}
                    </p>

                    <p>
                      <strong>Status :</strong>

                      {service.availability ? (
                        <span className="text-success ms-2">Available</span>
                      ) : (
                        <span className="text-danger ms-2">Unavailable</span>
                      )}
                    </p>
                  </div>

                  <div className="card-footer bg-white d-flex justify-content-between">
                    <button
                      className="btn btn-warning"
                      onClick={() => handleEdit(service)}
                    >
                      <FaEdit /> Edit
                    </button>

                    <button
                      className="btn btn-danger"
                      onClick={() => handleDelete(service.id)}
                    >
                      <FaTrash /> Delete
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-12">
              <div className="alert alert-info text-center">
                No Services Found.
              </div>
            </div>
          )}
        </div>
      )}

      {/* Pagination */}

      {state.totalPages > 1 && (
        <nav className="mt-4">
          <ul className="pagination justify-content-center">
            <li
              className={`page-item ${state.currentPage === 0 ? "disabled" : ""}`}
            >
              <button
                className="page-link"
                disabled={state.currentPage === 0}
                onClick={() => changePage(state.currentPage - 1)}
              >
                Previous
              </button>
            </li>

            {[...Array(state.totalPages)].map((_, index) => (
              <li
                key={index}
                className={`page-item ${state.currentPage === index ? "active" : ""}`}
              >
                <button className="page-link" onClick={() => changePage(index)}>
                  {index + 1}
                </button>
              </li>
            ))}

            <li
              className={`page-item ${state.currentPage === state.totalPages - 1 ? "disabled" : ""}`}
            >
              <button
                className="page-link"
                disabled={state.currentPage === state.totalPages - 1}
                onClick={() => changePage(state.currentPage + 1)}
              >
                Next
              </button>
            </li>
          </ul>
        </nav>
      )}

      <AddServiceModal
        show={showModal}
        handleClose={() => setShowModal(false)}
        editData={editData}
        onSubmit={handleSubmit}
        loading={state.loading}
      />
    </div>
  );
};

export default AddService;
