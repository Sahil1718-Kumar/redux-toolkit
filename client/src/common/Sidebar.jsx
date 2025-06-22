import React from "react";
import { NavLink } from "react-router-dom";

const menuItems = [
  {
    to: "/",
    label: "User",
    icon: "person",
    activePaths: ["/editUser", "/addUser"],
  },
  {
    to: "/categoryList",
    label: "Category",
    icon: "miscellaneous_services",
    activePaths: ["/editCategory", "/addCategory"],
  },
];

const Sidebar = ({ handleLinkClick }) => {
  const renderNavItem = ({ to, label, icon, activePaths = [] }) => {
    const isActivePath = () =>
      activePaths.some((path) => window.location.pathname.startsWith(path));

    return (
      <li className="nav-item" key={to}>
        <NavLink
          style={{ color: "black" }}
          className={({ isActive }) =>
            `nav-link ${isActive || isActivePath() ? "active bg-info" : ""}`
          }
          to={to}
          onClick={handleLinkClick}
        >
          <div
            className="text-center me-2 d-flex align-items-center justify-content-center"
            style={{ color: "black" }}
          >
            <i className="material-icons opacity-10">{icon}</i>
          </div>
          <span className="nav-link-text ms-1">{label}</span>
        </NavLink>
      </li>
    );
  };

  return (
    <aside
      className="sidenav navbar navbar-vertical navbar-expand-xs border-0 border-radius-xl my-3 fixed-start ms-3 shadow-dark "
      style={{ backgroundColor: "white" }}
      id="sidenav-main"
    >
      <div className="sidenav-header">
        <i
          className="fas fa-times p-3 cursor-pointer text-white opacity-5 position-absolute end-0 top-0 d-none d-xl-none"
          aria-hidden="true"
          id="iconSidenav"
        ></i>
        <NavLink className="navbar-brand m-0 text-center" to="/">
          <img
            src="/logo-ct-dark.png"
            className="navbar-brand-img h-100"
            alt="main_logo"
          />
        </NavLink>
      </div>
      <hr className="horizontal light mt-0 mb-2" />
      <div
        className="collapse navbar-collapse w-auto"
        id="sidenav-collapse-main"
      >
        <ul className="navbar-nav">{menuItems.map(renderNavItem)}</ul>
      </div>
    </aside>
  );
};

export default Sidebar;
