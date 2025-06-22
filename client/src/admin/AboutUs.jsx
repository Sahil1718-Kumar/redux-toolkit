import React, { useState, useEffect } from "react";
import apiInstance from "../utils/apiInstance";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const AboutUs = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [fetchingError, setFetchingError] = useState(null);
  const [error, setError] = useState("");
  const [submitError, setSubmitError] = useState("");
  const [loading, setLoading] = useState(false);
  const type = 0

  useEffect(() => {
    const fetchAboutUs = async () => {
      setLoading(true);
      try {
        const response = await apiInstance.get(`/getCms/${type}`);
        const { data } = response.data;
        setTitle(data?.title || "");
        setDescription(data?.description || "<p><br></p>");
      } catch (error) {
        setFetchingError("An error occurred while fetching the about us data..")
      } finally {
        setLoading(false);
      }
    };
    fetchAboutUs();
  }, []);


  const handleSubmit = async (event) => {
    event.preventDefault();
    const tempElement = document.createElement("div");
    tempElement.innerHTML = description;

    const plainText = tempElement.textContent || tempElement.innerText;

    if (!plainText.trim()) {
      setError("About Us section cannot be empty.");
      return;
    }

    setError("");
    setSubmitError("");
    setLoading(true);

    try {
      await apiInstance.put('/updateCms', {
        description,
        type
      });
      toast.success("About Us updated successfully");
    } catch (error) {
      setSubmitError("Error submitting About Us. Please try again.");
      toast.error("Error submitting About Us. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (fetchingError) return <div>{fetchingError}<br />Please try again after some time or check your internet connection.</div>


  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={2000}
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
                  <h6 className="text-white text-capitalize ps-3">About Us</h6>
                </div>
              </div>
              <form onSubmit={handleSubmit} className="p-4 position-relative">
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
                <div className="row mb-4">
                  <div className="col-12">
                    <div className="form-group">
                      <label htmlFor="title">Title</label>
                      <input
                        id="title"
                        type="text"
                        className="form-control "
                        value={title}
                        readOnly
                        style={{
                          paddingLeft: "10px",
                          color: 'white'
                        }}
                      />
                    </div>
                  </div>
                </div>
                <div className="row mb-2">
                  <div className="col-12">
                    <div className="form-group">
                      <label htmlFor="content">Content</label>
                      <div className="position-relative">
                        <ReactQuill
                          id="content"
                          style={{ height: "400px", marginBottom: "50px" }}
                          theme="snow"
                          value={description}
                          onChange={setDescription}
                          modules={{
                            toolbar: [
                              [{ header: "1" }, { header: "2" }, { font: [] }],
                              [{ list: "ordered" }, { list: "bullet" }],
                              ["bold", "italic", "underline"],
                              [{ color: [] }, { background: [] }],
                              [{ align: [] }],
                              ["clean"],
                            ],
                          }}
                        />
                        {description.trim() === "<p><br></p>" && (
                          <div className="text-danger"
                            style={{
                              position: "absolute",
                              top: 55,
                              left: 18,
                              right: 0,
                              bottom: 0,
                              pointerEvents: "none",
                              fontStyle: "italic",
                            }}
                          >
                            About Us section cannot be empty.
                          </div>
                        )}
                      </div>
                      {error && <p className="text-danger">{error}</p>}
                      {submitError && (
                        <p className="text-danger">{submitError}</p>
                      )}
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-12 d-flex justify-content-end mt-5">
                    <button
                      type="submit"
                      className="btn bg-info"
                      style={{ color: "white" }}
                    >
                      Update
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutUs;
