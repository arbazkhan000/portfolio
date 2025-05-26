import express from "express";
import ProjectController from "../controller/projectController.js";
import { upload } from "../utils/multer.js";

const router = express.Router();

router.route("/").get(ProjectController.getProjects);
router.route("/").post(upload.single("image"), ProjectController.createProject);
router
    .route("/:id")
    .put(upload.single("image"), ProjectController.updateProject);
router.route("/:id").delete(ProjectController.deleteProject);
router.route("/:category").get(ProjectController.getProjectsByCategory);

export default router;
