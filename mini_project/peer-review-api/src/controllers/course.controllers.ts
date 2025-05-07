import { Request, Response } from "express";
import CourseServices from "../services/course.services.js";

class CourseController {
  static async getAllCourses(req: Request, res: Response): Promise<void> {
    try {
      const courses = await CourseServices.getAllSCourses();
      res.status(200).json({
        success: true,
        data: courses,
      });
      return;
    } catch (error) {
      console.error("Error fetching courses:", error);
      res.status(500).json({
        success: false,
        message: "Failed to fetch courses",
      });
      return;
    }
  }

  static async getCoursesById(req: Request, res: Response): Promise<void> {
    try {
      const { courseId } = req.params;

      const course = await CourseServices.getCourseById(courseId);
      if (!course) {
        res.status(404).json({
          success: false,
          message: `Course with given id not found`,
        });
        return;
      }

      res.status(200).json({
        success: true,
        data: course,
      });
      return;
    } catch (error) {
      console.error("Error fetching course:", error);
      res.status(500).json({
        success: false,
        message: "Failed to fetch course",
      });
      return;
    }
  }
}

export default CourseController;
