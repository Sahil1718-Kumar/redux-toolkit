import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { addUser } from "../redux/thunkApi";

const AddUser = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState(null);
  const [nameError, setNameError] = useState("");

  const { loading, error } = useSelector((state) => state.user);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  const validateName = (value) => {
    if (!value.trim()) return "Name is required.";
    if (value.trim().length > 20) return "Name must be within 20 characters.";
    return "";
  };

  const handleNameChange = (e) => {
    const value = e.target.value;
    setName(value);
    setNameError(validateName(value));
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleBlur = () => {
    setNameError(validateName(name));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const error = validateName(name);
    if (error) {
      setNameError(error);
      toast.error(error);
      return;
    }

    if (!image) {
      toast.error("Image is required.");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("image", image);

    try {
      const result = await dispatch(addUser(formData)).unwrap();
      toast.success(result?.message || "User added successfully!");
      setTimeout(() => navigate("/"), 1000);
    } catch (err) {}
  };

  return (
    <>
      <ToastContainer position="top-right" autoClose={2000} hideProgressBar />
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <div className="card my-4">
              <div className="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
                <div className="bg-info shadow-dark border-radius-lg">
                  <h6 className="text-white text-capitalize ps-3">Add User</h6>
                </div>
              </div>

              <form onSubmit={handleSubmit} style={{ position: "relative" }}>
                {loading && (
                  <div
                    className="d-flex justify-content-center align-items-center"
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      backgroundColor: "rgba(255, 255, 255, 0.7)",
                      zIndex: 1000,
                    }}
                  >
                    <div
                      className="spinner-border text-info"
                      role="status"
                      style={{ width: "50px", height: "50px" }}
                    >
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  </div>
                )}

                <div className="card-body">
                  <div className="row mt-2">
                    <div className="col-lg-6">
                      <div className="form-group mb-3">
                        <label htmlFor="name">Name</label>
                        <input
                          type="text"
                          className={`form-control ${
                            nameError ? "is-invalid" : ""
                          }`}
                          name="name"
                          value={name}
                          onChange={handleNameChange}
                          onBlur={handleBlur}
                        />
                        {nameError && (
                          <div className="invalid-feedback d-block">
                            {nameError}
                          </div>
                        )}
                      </div>
                      <div className="form-group mb-3">
                        <label htmlFor="email">Email</label>
                        <input
                          type="text"
                          className={`form-control`}
                          name="email"
                          value={email}
                          onChange={handleEmailChange}
                        />
                      </div>

                      <div className="form-group mb-3">
                        <label htmlFor="image">Image</label>
                        <input
                          type="file"
                          accept="image/*"
                          className="form-control"
                          onChange={handleImageChange}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mx-4 text-end">
                  <button
                    type="submit"
                    className="btn btn-info"
                    style={{ marginRight: "10px" }}
                    disabled={loading}
                  >
                    Add
                  </button>
                  <button
                    type="button"
                    className="btn btn-info"
                    onClick={() => navigate(-1)}
                    disabled={loading}
                  >
                    Back
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddUser;
