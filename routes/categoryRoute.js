import express from "express";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import {
  categoryController,
  createCategory,
  deleteCategory,
  singleCategory,
  updateCategory,
} from "../controllers/categoryController.js";

const router = express.Router();

router.post("/create-category", requireSignIn, isAdmin, createCategory);

router.put("/update-category/:id", requireSignIn, isAdmin, updateCategory);

router.get("/get-category", categoryController);

router.get("/single-category/:slug", singleCategory);

router.delete("/delete-category/:id", requireSignIn, isAdmin, deleteCategory);

export default router;
