const express = require("express");
const router = express.Router();
const { auth } = require("../middlewares/authMiddleware");
const authController = require("../controllers/adminControllers/authController");
const categoryController = require("../controllers/adminControllers/categoryController");
const userController = require("../controllers/adminControllers/userController");
const usersController = require("../controllers/adminControllers/usersController");

//admin
router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.get("/adminProfile/:id", auth, authController.adminProfile);
router.put("/updateProfile/:id", auth, authController.updateProfile);
router.put("/updatePassword/:id", auth, authController.updatePassword);
router.put(
  "/update_commission_serviceFee",
  auth,
  authController.update_commission_serviceFee
);

//user
router.get("/all_user_list", auth, userController.all_user_list);
//customer
router.get("/customer_list", auth, userController.customer_list);
router.put("/toggle_status/:id", userController.toggle_status);
router.put("/approve_user/:id", auth, userController.approve_user);
router.get(
  "/view_customer_details/:id",
  auth,
  userController.view_customer_details
);

// category
router.post("/add_category", categoryController.add_category);
router.get("/category_list", categoryController.category_list);
router.get("/view_category/:id", categoryController.view_category);
router.put("/edit_category", categoryController.edit_category);
router.delete("/delete_category/:id", categoryController.delete_category);
router.put("/toggleStatus/:id", categoryController.toggle_status);

//user
router.post("/add_user", usersController.add_user);
router.get("/user_list", usersController.user_list);
router.get("/view_user/:id", usersController.view_user);
router.put("/edit_user", usersController.edit_user);
router.delete("/delete_user/:id", usersController.delete_user);
router.put("/toggleUserStatus/:id", usersController.toggle_status);

module.exports = router;
