import express from "express";
import courseController from "../controllers/course.controllers.js";

const router = express.Router();

router.get("/course", courseController.getAllCourses);
router.get("/course/:courseId", courseController.getCoursesById);

export default router;
