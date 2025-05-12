import express from "express";
import courseController from "../controllers/course.controllers.js";
const router = express.Router();
router.get("/courses", courseController.getAllCourses);
router.get("/courses/:courseId", courseController.getCoursesById);
export default router;
