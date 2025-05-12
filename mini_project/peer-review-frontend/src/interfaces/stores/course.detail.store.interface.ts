import type Course from "../entities/course.interface";

export default interface CourseStore {
  course: Course | null;
  courseLoading: boolean;
  courseError: string | null;
  fetchCourseDetail: (id: string) => Promise<void>;
}
