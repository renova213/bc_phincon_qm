import type Course from "../entities/course.interface";

export default interface CourseStore {
  courses: Course[];
  courseLoading: boolean;
  courseError: string | null;
  fetchCourses: () => Promise<void>;
}
