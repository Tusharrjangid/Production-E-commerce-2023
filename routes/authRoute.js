import express from "express";
import {
  forgotPassword,
  getAllOrders,
  getOrders,
  loginController,
  orderStatus,
  registerController,
  testController,
  updateProfile,
} from "../controllers/authController.js";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/register", registerController);

router.post("/login", loginController);

router.post("/forgot-password", forgotPassword);

router.get("/test", requireSignIn, isAdmin, testController);

// protected user route
router.get("/user-auth", requireSignIn, (req, res) => {
  res.status(200).send({ ok: true });
});

// protected admin route
router.get("/admin-auth", requireSignIn, isAdmin, (req, res) => {
  res.status(200).send({ ok: true });
});

// update profile
router.put("/profile", requireSignIn, updateProfile);

//orders
router.get("/orders", requireSignIn, getOrders);

//admin all orders
router.get("/all-orders", requireSignIn, isAdmin, getAllOrders);

router.put("/order-status/:orderId", requireSignIn, isAdmin, orderStatus);

export default router;
