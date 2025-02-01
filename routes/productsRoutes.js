import express from "express";
import { isAdmin, requireSignIn } from "../middlewares/authMiddlewares.js";
import {
  brainTreePaymentController,
  braintreeTokenController,
  // checkout,
  CreateProductsController,
  DeleteProductsController,
  GetProductsController,
  GetProductsPhotoController,
  GetSingleProductsController,
  productCategoryController,
  productCountController,
  productFiltersController,
  productListController,
  realtedProductController,
  searchProductController,
  UpdateProductsController,
} from "../controllers/productsControllrs.js";
import formidable from "express-formidable";
const router = express.Router();
// routes
// create Product
router.post(
  "/create-product",
  requireSignIn,
  isAdmin,
  formidable(),
  CreateProductsController
);
// update Product
router.put(
  "/update-product/:id",
  requireSignIn,
  isAdmin,
  formidable(),
  UpdateProductsController
);
// get-product
router.get("/get-product", GetProductsController);
// get single product
router.get("/get-product/:slug", GetSingleProductsController);
// get product photo
router.get("/product-photo/:pid", GetProductsPhotoController);
// delet product
router.delete("/delete-product/:pid", DeleteProductsController);
// router.delete("", deleteProductController)
//filter product
router.post("/product-filters", productFiltersController);
//product count
router.get("/product-count", productCountController);
//product per page
router.get("/product-list/:page", productListController);
//search product
router.get("/search/:keyword", searchProductController);
//similar product
router.get("/related-product/:pid/:cid", realtedProductController);
//category wise product
router.get("/product-category/:slug", productCategoryController);
//payments routes
//token
router.get("/braintree/token", braintreeTokenController);
//payments
router.post("/braintree/payment", requireSignIn, brainTreePaymentController);
// router.post('/checkout',checkout);
export default router;
