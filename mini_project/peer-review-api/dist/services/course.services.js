import db from "../models/index.js";
class CourseServices {
    static async getAllSCourses() {
        try {
            const courses = await db.Course.findAll();
            return courses;
        }
        catch {
            throw Error("Failed to get all course");
        }
    }
    static async getCourseById(id) {
        try {
            const course = await db.Course.findByPk(id);
            return course;
        }
        catch {
            throw Error("Failed to get course by id");
        }
    }
}
export default CourseServices;
