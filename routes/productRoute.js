import express from "express";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import {
  braintreePayment,
  braintreeToken,
  createProduct,
  deleteProduct,
  getProduct,
  getSingleProduct,
  productCategory,
  productCount,
  productFilter,
  productList,
  productPhoto,
  realtedProduct,
  searchProduct,
  updateProduct,
} from "../controllers/productController.js";
import formidable from "express-formidable";

const router = express.Router();

router.post(
  "/create-product",
  requireSignIn,
  isAdmin,
  formidable(),
  createProduct
);
router.put(
  "/update-product/:pid",
  requireSignIn,
  isAdmin,
  formidable(),
  updateProduct
);

router.get("/get-product", getProduct);

router.get("/get-product/:slug", getSingleProduct);

router.get("/product-photo/:pid", productPhoto);

router.delete("/delete-product/:pid", deleteProduct);

// filter product
router.post("/product-filter", productFilter);

//product count
router.get("/product-count", productCount);

//product per page
router.get("/product-list/:page", productList);

// search product
router.get("/search/:keyword", searchProduct);

//similar product
router.get("/related-product/:pid/:cid", realtedProduct);

// category wise product
router.get("/product-category/:slug", productCategory);

// payments route
//token
router.get("/braintree/token", braintreeToken);

// payments
router.post("/braintree/payment", requireSignIn, braintreePayment);

export default router;
