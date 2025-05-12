import db from "../../models/index.js";
import CourseServices from "../../services/course.services";
jest.mock("../models/index.js", () => ({
    Course: {
        findAll: jest.fn(),
        findByPk: jest.fn(),
    },
}));
describe("CourseServices", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });
    describe("getAllSCourses", () => {
        it("should return all courses", async () => {
            const mockCourses = [{ id: "1", title: "Course A" }];
            db.Course.findAll.mockResolvedValue(mockCourses);
            const result = await CourseServices.getAllSCourses();
            expect(db.Course.findAll).toHaveBeenCalled();
            expect(result).toEqual(mockCourses);
        });
        it("should throw error if findAll fails", async () => {
            db.Course.findAll.mockRejectedValue(new Error("DB Error"));
            await expect(CourseServices.getAllSCourses()).rejects.toThrow("Failed to get all course");
        });
    });
    describe("getCourseById", () => {
        it("should return course by ID", async () => {
            const mockCourse = { id: "1", title: "Course B" };
            db.Course.findByPk.mockResolvedValue(mockCourse);
            const result = await CourseServices.getCourseById("1");
            expect(db.Course.findByPk).toHaveBeenCalledWith("1");
            expect(result).toEqual(mockCourse);
        });
        it("should return null if course not found", async () => {
            db.Course.findByPk.mockResolvedValue(null);
            const result = await CourseServices.getCourseById("999");
            expect(result).toBeNull();
        });
        it("should throw error if findByPk fails", async () => {
            db.Course.findByPk.mockRejectedValue(new Error("DB Error"));
            await expect(CourseServices.getCourseById("1")).rejects.toThrow("Failed to get course by id");
        });
    });
});
