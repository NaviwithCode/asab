import express from "express"
import{isAdmin,requireSignIn} from './../middlewares/authMiddlewares.js'
import { categoryController, createCategoryController, DeleteCategoryController, singleCategoryController, updateCategoryController } from "../controllers/categoryController.js"
const router = express.Router()

// routes
// create category route 
router.post("/create-category", requireSignIn, isAdmin, createCategoryController)
// update category route
router.put("/update-category/:id", requireSignIn, isAdmin, updateCategoryController)
// get all category route
router.get("/get-category",categoryController)
// single category
router.get("/single-category/:slug", singleCategoryController)
// delete category
router.delete("/delete-category/:id",requireSignIn,isAdmin, DeleteCategoryController)
export default router