import { Router } from "express";
import { addProduct, getAllProducts, getProductById, getProducts, getProductsByDeepCategoryId } from "../controllers/product.js";
import { verifyAdmin } from "../utils/verifyToken.js";

//route requests
const router = Router()

router.post("/addproduct", addProduct)
router.get("/", getAllProducts)
router.get("/getbydeeepid/:id", getProductsByDeepCategoryId)
router.get("/getsingleproduct/:id", getProductById)
router.get("/getproducts/", getProducts)





export default router