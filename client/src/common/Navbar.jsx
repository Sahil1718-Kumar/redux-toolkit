import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import apiInstance, { imageBaseUrl } from "../utils/apiInstance";
import Swal from "sweetalert2";
import { jwtDecode } from "jwt-decode";
import "./Navbar.css";

const Navbar = ({ toggleSidebar, closeSidebar }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const closeDropdown = () => {
    setDropdownOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const fetchProfile = async () => {
    const decode = jwtDecode(token);
    const id = decode.id;
    try {
      const response = await apiInstance.get(`/adminProfile/${id}`);
      if (response.data && response.data.admin) {
        const { image, name } = response.data.admin;
        setImage(`${imageBaseUrl}/${image}`);
        setName(name);
      }
    } catch (error) {
      // console.error("Error fetching profile data", error);
    }
  };

  const token = localStorage.getItem("token");
  useEffect(() => {
    if (!token) {
      // console.error("No token found in localStorage");
      return;
    }

    fetchProfile();

    if (location.state?.updated) {
      fetchProfile();
    }
  }, [location.state]);

  const logout = async () => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out of your account.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#57cbff",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, log out!",
      customClass: {
        popup: "custom-swal-popup",
        title: "custom-swal-title",
        content: "custom-swal-content",
        confirmButton: "custom-swal-button",
        cancelButton: "custom-swal-button",
      },
    });

    if (result.isConfirmed) {
      try {
        localStorage.removeItem("token");
        localStorage.setItem("logoutmessage", "true");
        navigate("/");
        closeDropdown();
      } catch (error) {
        // console.error("Error logging out:", error);
      }
    }
  };

  const pathToTitleMap = {
    "/": "User",
    "/addUser": "Add User",
    "/category": "Category",
    "/addCategory": "Add Category",
  };

  const currentPath = location.pathname;
  const currentTitle =
    pathToTitleMap[currentPath] ||
    (currentPath.startsWith("/editCategory")
      ? "Edit Category"
      : currentPath.startsWith("/editUser")
      ? "Edit User"
      : "");

  const handleLinkClick = () => {
    closeSidebar();
  };

  return (
    <nav
      className="navbar navbar-main bg-light navbar-expand-lg px-0 mx-4 mt-3 shadow-dark border-radius-xl position-sticky top-0"
      id="navbarBlur"
      data-scroll="true"
      style={{ zIndex: "100" }}
    >
      <div className="container-fluid d-flex justify-content-between align-items-center">
        <div className="d-flex ">
          <button
            onClick={toggleSidebar}
            id="navbarToggler"
            // className="navbar-toggler d-xl-none"
            className="navbar-toggler"
            type="button"
            style={{
              background: "none",
              border: "none",
              fontSize: "24px",
            }}
          >
            <i className="fas fa-bars"></i>
          </button>
          <h2 className="font-weight-bolder mb-0 " id="navbarHeader">
            {currentTitle}
          </h2>
        </div>
        <ul className="navbar-nav navbar-right d-flex align-items-center">
          <li className="d-flex align-items-center ms-auto position-relative">
            <h6 className="mb-0" style={{ color: "black" }}>
              {name}
            </h6>
            <div className="dropdown" ref={dropdownRef}>
              <Link
                to="#"
                onClick={toggleDropdown}
                className="nav-link nav-link-lg nav-link-user d-flex align-items-center"
                style={{ position: "relative" }}
              >
                <img
                  alt="profile"
                  src={image || "default_avatar.png"}
                  style={{ height: "50px", width: "50px", cursor: "pointer" }}
                  className="rounded-circle mr-1"
                />
              </Link>
              {dropdownOpen && (
                <div
                  className={`dropdown-menu dropdown-menu-end ${
                    dropdownOpen ? "show" : ""
                  }`}
                  style={{
                    backgroundColor: "#fff",
                    position: "absolute",
                    top: "15px",
                    padding: "10px",
                    borderRadius: "0.5rem",
                    minWidth: "130px",
                    zIndex: 1000,
                  }}
                >
                  <Link
                    to="/profile"
                    className="dropdown-item has-icon"
                    style={{ color: "#57cbff", fontWeight: "500" }}
                    onClick={() => {
                      closeDropdown();
                      handleLinkClick();
                    }}
                  >
                    <i className="far fa-user" /> Profile
                  </Link>
                  <Link
                    to="/changepassword"
                    className="dropdown-item has-icon"
                    style={{ color: "#57cbff", fontWeight: "500" }}
                    onClick={() => {
                      closeDropdown();
                      handleLinkClick();
                    }}
                  >
                    <i className="fas fa-cogs" /> Change Password
                  </Link>
                  <Link
                    to="#"
                    className="dropdown-item has-icon"
                    style={{ color: "#FF4500", fontWeight: "500" }}
                    onClick={logout}
                  >
                    <i className="fas fa-sign-out-alt" /> Log out
                  </Link>
                </div>
              )}
            </div>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
