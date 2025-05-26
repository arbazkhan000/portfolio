import express from "express";
import AdminController from "../controller/adminController.js";

const router = express.Router();
router.post("/register", AdminController.adminRegister);
router.post("/login", AdminController.adminLogin);

export default router;
// protect,