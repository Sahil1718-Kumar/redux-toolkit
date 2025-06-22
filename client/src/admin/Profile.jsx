
import React, { useState, useEffect } from "react";
import apiInstance, { imageBaseUrl } from "../utils/apiInstance";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenNib } from "@fortawesome/free-solid-svg-icons";
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'


const Profile = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    phone_no: "",
    location: "",
    image: "",
    country_code: ""
  });

  const [imagePreview, setImagePreview] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [fetchingError, setFetchingError] = useState(null);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();


  const fetchProfileData = async () => {
    setLoading(true);
    const token = localStorage.getItem("token");
    if (!token) {
      // console.error("No token found in localStorage");
      return;
    }

    const decode = jwtDecode(token);
    const id = decode.id;

    try {
      const response = await apiInstance.get(`/adminProfile/${id}`);
      if (response.data && response.data.admin) {
        setData(response.data?.admin);
        const imageUrl = response.data?.admin?.image.startsWith("http")
          ? response.data?.admin?.image
          : `${imageBaseUrl}/${response.data?.admin?.image}`;
        setImagePreview(imageUrl);
      }
    } catch (error) {
      setFetchingError("An error occurred while fetching profile details...")
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfileData();
  }, [])


  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };


  let formErrors = {};
  const validateForm = () => {
    // if (!data.name) formErrors.name = "Name is required";
    // if (!/^[A-Za-z\s]+$/.test(data.name)) formErrors.name = "Enter a valid name";
    // if (!data.phone) formErrors.phone = "Phone number is required";
    // if (isNaN(data.phone)) formErrors.phone = "Enter a valid phone number";
    // if (!data.location) formErrors.location = "Address is required";
    // if (!isNaN(data.location)) formErrors.location = "Enter a valid address";
    // if (selectedImage && selectedImage.size > (1024 * 1024 * 6)) formErrors.image = "Image size must be less than 6mb.";
    // return formErrors;

    if (!data.name) {
      formErrors.name = "Name is required";
    } else if (!/^[A-Za-z\s]+$/.test(data.name)) {
      formErrors.name = "Enter a valid name";
    }

    if (!data.phone_no) {
      formErrors.phone_no = "Phone number is required";
    } else if (isNaN(data.phone_no)) {
      formErrors.phone_no = "Enter a valid phone number";
    }

    if (!data.location) {
      formErrors.location = "Address is required";
    } else if (!isNaN(data.location)) {
      formErrors.location = "Enter a valid address";
    }

    if (selectedImage && selectedImage.size > (1024 * 1024 * 6)) formErrors.image = "Image size must be less than 6mb.";
    return formErrors;
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }
    setErrors('');
    setLoading(true);

    const token = localStorage.getItem("token");
    if (!token) {
      // console.error("No token found in localStorage");
      return;
    }

    const decode = jwtDecode(token);
    const id = decode.id;

    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("phone_no", data.phone_no);
    formData.append("location", data.location);
    formData.append("country_code", data.country_code);
    if (selectedImage) {
      formData.append("image", selectedImage);
    }

    try {
      await apiInstance.put(`/updateProfile/${id}`, formData);
      toast.success("Profile updated successfully");
      fetchProfileData();
      navigate('/profile', { state: { updated: true } });
    } catch (error) {
      toast.error("Error updating profile");
    } finally {
      setLoading(false);
    }
  };

  if (fetchingError) return <div>{fetchingError}<br />Please try again after some time or check your internet connection.</div>
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      <div className="container-fluid ">
        <div className="row">
          <div className="col-12">
            <div className="card my-4">
              <div className="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
                <div className="bg-info shadow-dark border-radius-lg">
                  <h6 className="text-white text-capitalize ps-3">Profile</h6>
                </div>
              </div>
              <div className="position-relative">
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
                    <div className="spinner-border text-info" role="status" style={{ width: '50px', height: '50px' }}>
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  </div>
                )}
                <form
                  onSubmit={handleSubmit}
                  className="form-validate"
                  noValidate
                  encType="multipart/form-data"
                >

                  <div className="row">
                    <div className="col-md-12">
                      <div className="card">
                        <div className="card-body py-4">
                          <div className="tab-content">
                            <div
                              className="tab-pane active"
                              id="account"
                              aria-labelledby="account-tab"
                              role="tabpanel"
                            >
                              <div
                                style={{
                                  display: "flex",
                                  flexWrap: "wrap",
                                  alignItems: "flex-start",
                                }}
                              >
                                <div
                                  className="col-12 col-lg-4"
                                  style={{
                                    flex: "0 0 auto",
                                    position: "relative",
                                    padding: "8px",
                                    alignSelf: 'center'
                                  }}
                                >
                                  {imagePreview && (
                                    <>
                                      <div className="d-flex justify-content-center content-center">
                                        <div className="position-relative " style={{ width: "100%", maxWidth: "300px" }}>
                                          <img
                                            src={imagePreview}
                                            alt="Preview"
                                            style={{
                                              marginTop: "10px",
                                              marginBottom: "20px",
                                              width: "100%",
                                              height: "auto",
                                              maxWidth: "300px",
                                              height: "300px",
                                              objectFit: "cover",
                                              borderRadius: "20px",
                                            }}
                                          />
                                          <label
                                            htmlFor="image"
                                            style={{
                                              position: "absolute",
                                              bottom: "12px",
                                              right: "0",
                                              cursor: "pointer",
                                              backgroundColor: "rgba(3, 3, 3, 0.7)",
                                              borderRadius: "10%",
                                              padding: "5px",
                                              width: "50px",
                                              textAlign: "center",
                                              borderEndEndRadius: "20px"
                                            }}
                                          >
                                            <FontAwesomeIcon icon={faPenNib} size="lg" color="#57cbff" />
                                          </label>
                                        </div>
                                      </div>
                                    </>
                                  )}

                                  <input
                                    type="file"
                                    style={{ display: "none" }}
                                    id="image"
                                    accept=".jpg,.jpeg,.png"
                                    onChange={handleImageChange}
                                  />
                                  {errors.image && (
                                    <p style={{ color: "red" }}>
                                      {errors.image}
                                    </p>
                                  )}
                                </div>

                                <div
                                  className="col-12 col-lg-8"
                                  style={{ flex: "1", marginLeft: "16px" }}
                                >


                                  <div style={{ marginBottom: "16px" }}>
                                    <label htmlFor="name">Name</label>
                                    <input
                                      type="text"
                                      required
                                      style={{ width: "100%", padding: "8px", borderRadius: "4px" }}
                                      placeholder="Name"
                                      name="name"
                                      id="name"
                                      value={data.name}
                                      onChange={(e) => setData(prev => ({ ...prev, name: e.target.value }))}
                                    />
                                    {errors.name && <p style={{ color: "red" }}>{errors.name}</p>}
                                  </div>

                                  {/* <div style={{ marginBottom: "16px" }}>
                                    <label htmlFor="phone">Phone Number</label>
                                    <div style={{ display: "flex", gap: "10px" }}>
                                      <input
                                        type="text"
                                        name="country_code"
                                        className="form-control cursor-pointer me-1"
                                        required
                                        value={`+${data?.country_code}` || ""}

                                        style={{
                                          width: "75px",
                                          paddingLeft: "10px",
                                          color: 'white'
                                        }}
                                      >

                                      </input>
                                      <input
                                        type="text"
                                        required
                                        style={{ width: "100%", padding: "8px", borderRadius: "4px" }}
                                        placeholder="Phone number"
                                        name="phone_no"
                                        id="phone"
                                        value={data.phone_no}
                                        onChange={(e) => setData(prev => ({ ...prev, phone: e.target.value }))}
                                      />
                                    </div>
                                    {errors.phone_no && <p style={{ color: "red" }}>{errors.phone}</p>}
                                  </div> */}

                                  <div style={{ marginBottom: "16px" }}>
                                    <label htmlFor="phone">Phone Number</label>
                                    <PhoneInput
                                      country={'in'} // set default country
                                      value={`${data.country_code}${data.phone_no}`}
                                      onChange={(value, country) => {
                                        const dialCode = country?.dialCode || '';
                                        const nationalNumber = value.replace(dialCode, '');
                                        setData(prev => ({
                                          ...prev,
                                          country_code: dialCode,
                                          phone_no: nationalNumber,
                                        }));
                                      }}
                                      inputStyle={{ width: "100%" }}
                                      inputProps={{
                                        required: true,
                                        name: 'phone',
                                        autoFocus: true,
                                      }}
                                    />
                                    {errors.phone_no && <p style={{ color: "red" }}>{errors.phone_no}</p>}
                                  </div>




                                  <div style={{ marginBottom: "16px" }}>
                                    <label htmlFor="location">Address</label>
                                    <input
                                      type="text"
                                      required
                                      style={{ width: "100%", padding: "8px", borderRadius: "4px" }}
                                      placeholder="Address"
                                      name="location"
                                      id="location"
                                      value={data.location}
                                      onChange={(e) => setData(prev => ({ ...prev, location: e.target.value }))}
                                    />
                                    {errors.location && <p style={{ color: "red" }}>{errors.location}</p>}
                                  </div>



                                  <div style={{ marginBottom: "16px" }}>
                                    <label
                                      style={{
                                        display: "block",
                                        marginBottom: "8px",
                                      }}
                                      htmlFor="email"
                                    >
                                      Email
                                    </label>
                                    <input
                                      type="email"
                                      required
                                      readOnly
                                      style={{
                                        width: "100%",
                                        padding: "8px",
                                        borderRadius: "4px",
                                        backgroundColor: "grey",
                                        color: 'white',
                                      }}
                                      placeholder="Email"
                                      name="email"
                                      id="email"
                                      value={data.email}
                                    />
                                  </div>

                                  <div
                                    style={{
                                      display: "flex",
                                      justifyContent: "flex-end",
                                      marginTop: "16px",
                                    }}
                                  >
                                    <button
                                      type="submit"
                                      className="btn btn-info"
                                      style={{
                                        color: 'white'
                                      }}
                                    >
                                      Update
                                    </button>

                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;


