import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { viewUser, editUser } from "../redux/thunkApi";
import "react-toastify/dist/ReactToastify.css";
import { imageBaseUrl } from "../utils/apiInstance";
const EditUser = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user_details, loading, error } = useSelector((state) => state.user);

  const [name, setName] = useState("");
  const [nameError, setNameError] = useState("");
  const [email, setEmail] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    dispatch(viewUser(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (user_details) {
      setName(user_details.name || "");
      setEmail(user_details?.email || "");
      setImagePreview(`${imageBaseUrl}/${user_details.image}` || null);
    }
  }, [user_details]);

  useEffect(() => {
    if (error) {
      toast.error(error?.message || error || "Something went wrong");
    }
  }, [error]);

  const validateName = (value) => {
    if (!value.trim()) return "User name is required.";
    if (value.trim().length > 20)
      return "User name must be within 20 characters.";
    return "";
  };

  const handleNameChange = (e) => {
    const val = e.target.value;
    setName(val);
    setNameError(validateName(val));
  };
  const handleEmailChange = (e) => {
    const val = e.target.value;
    setEmail(val);
  };

  const handleNameBlur = () => {
    setNameError(validateName(name));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationError = validateName(name);
    if (validationError) {
      setNameError(validationError);
      toast.error(validationError);
      return;
    }

    const formData = new FormData();
    formData.append("id", id);
    formData.append("name", name);
    formData.append("email", email);
    if (imageFile) formData.append("image", imageFile);
    try {
      await dispatch(editUser(formData)).unwrap();
      toast.success("User updated successfully");
      setTimeout(() => navigate("/"), 1000);
    } catch (err) {
      toast.error(err?.message || "Update failed");
    }
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
                  <h6 className="text-white text-capitalize ps-3">Edit User</h6>
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
                      <div className="form-group mb-2">
                        <label htmlFor="name">Name</label>
                        <input
                          type="text"
                          className={`form-control ${
                            nameError ? "is-invalid" : ""
                          }`}
                          name="name"
                          value={name}
                          onChange={handleNameChange}
                          onBlur={handleNameBlur}
                          autoComplete="off"
                          style={{ paddingLeft: "10px", color: "white" }}
                        />
                        {nameError && (
                          <div className="invalid-feedback d-block">
                            {nameError}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="col-lg-6">
                      <div className="form-group mb-2">
                        <label htmlFor="email">Email</label>
                        <input
                          type="email"
                          className={`form-control`}
                          name="email"
                          value={email}
                          onChange={handleEmailChange}
                          autoComplete="off"
                          style={{ paddingLeft: "10px", color: "white" }}
                        />
                      </div>
                    </div>

                    <div className="col-lg-6">
                      <label htmlFor="image">Image</label>
                      <input
                        type="file"
                        accept="image/*"
                        className="form-control"
                        onChange={handleImageChange}
                      />
                      {imagePreview && (
                        <img
                          src={imagePreview}
                          alt="preview"
                          style={{
                            marginTop: "10px",
                            width: "150px",
                            height: "150px",
                            objectFit: "cover",
                            borderRadius: "8px",
                          }}
                        />
                      )}
                    </div>
                  </div>
                </div>

                <div className="mx-4 text-end">
                  <button
                    type="submit"
                    className="btn btn-info"
                    style={{ marginRight: "10px" }}
                  >
                    Update
                  </button>
                  <button
                    type="button"
                    className="btn btn-info"
                    onClick={() => navigate(-1)}
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

export default EditUser;
