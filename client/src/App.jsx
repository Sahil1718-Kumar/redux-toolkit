import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrivateRoute from "./utils/PrivateRoute";
import Login from "./admin/Login";
import Layout from "./common/Layout";

import ScrollToTop from "./utils/ScrollToTop";

import CategoryList from "./Category/CategoryList";
import AddCategory from "./Category/AddCategory";
import EditCategory from "./Category/EditCategory";
import AddUser from "./users/AddUser";
import EditUser from "./users/EditUser";
import UserList from "./users/UserList";
const App = () => {
  return (
    <>
      <Router>
        <ScrollToTop />
        <Routes>
          {/* <Route path="/" element={<Login />} /> */}
          <Route element={<Layout />}>
            <Route path="/categoryList" element={<CategoryList />} />
            <Route path="/addCategory" element={<AddCategory />} />
            <Route path="/editCategory/:id" element={<EditCategory />} />
            <Route path="/" element={<UserList />} />
            <Route path="/addUser" element={<AddUser />} />
            <Route path="/editUser/:id" element={<EditUser />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
};

export default App;
