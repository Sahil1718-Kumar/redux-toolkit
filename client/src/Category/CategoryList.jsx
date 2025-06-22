import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";
import {
  getCategoryList,
  deleteCategory,
  toggleCategoryStatus,
} from "../redux/thunkApi";
import "react-toastify/dist/ReactToastify.css";
import "../common/Table.css";
import { imageBaseUrl } from "../utils/apiInstance";

const CategoryList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { category_list, loading, error } = useSelector(
    (state) => state.category
  );

  useEffect(() => {
    dispatch(getCategoryList());
  }, [dispatch]);

  useEffect(() => {
    if (error) toast.error(error?.message || "Something went wrong");
  }, [error]);

  const handleDelete = async (id) => {
    const res = await Swal.fire({
      title: "Are you sure?",
      text: "This will delete the category!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    });

    if (res.isConfirmed) {
      dispatch(deleteCategory(id))
        .unwrap()
        .then(() => {
          toast.success("Category deleted");
        })
        .catch(() => {
          toast.error("Failed to delete category");
        });
    }
  };

  const handleToggle = async (id) => {
    try {
      await dispatch(toggleCategoryStatus(id)).unwrap();
      toast.success("Status updated");
    } catch (error) {
      toast.error("Status update failed");
    }
  };

  return (
    <div className="container-fluid" id="tableContainer">
      <ToastContainer position="top-right" autoClose={2000} hideProgressBar />
      <div className="card my-4">
        <div className="card-header bg-info d-flex justify-content-between align-items-center p-3">
          <h6 className="text-white mb-0">Categories</h6>
          <button
            className="btn btn-light text-info"
            onClick={() => navigate("/addCategory")}
          >
            Add
          </button>
        </div>
        <div className="card-body">
          {loading ? (
            <div className="text-center my-5">
              <div className="spinner-border text-info" role="status" />
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table text-center resturent_table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Image</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {category_list?.length === 0 ? (
                    <tr>
                      <td colSpan="5" className="text-info">
                        No categories found
                      </td>
                    </tr>
                  ) : (
                    category_list.map((cat, index) => (
                      <tr key={cat.id}>
                        <td>{index + 1}</td>
                        <td>{cat?.name}</td>
                        <td>
                          <img
                            src={`${imageBaseUrl}/${cat?.image}`}
                            alt="category"
                            style={{
                              width: 50,
                              height: 50,
                              objectFit: "cover",
                              borderRadius: "8px",
                            }}
                          />
                        </td>
                        <td>
                          <div className="form-check form-switch d-flex align-items-center justify-content-center">
                            <input
                              type="checkbox"
                              className="form-check-input"
                              checked={cat.status === 0}
                              onChange={() => handleToggle(cat.id)}
                            />
                          </div>
                        </td>
                        <td>
                          <Link
                            to={`/editCategory/${cat.id}`}
                            className="btn btn-info btn-sm mx-1"
                          >
                            <i className="fas fa-edit" />
                          </Link>
                          <button
                            className="btn btn-danger btn-sm mx-1"
                            onClick={() => handleDelete(cat.id)}
                          >
                            <i className="fas fa-trash" />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoryList;
