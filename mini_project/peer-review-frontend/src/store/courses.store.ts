import { create } from "zustand";
import axios from "axios";
import type CourseStore from "../interfaces/stores/course.store.interface";

const BASE_URL = "http://localhost:3000/api";

export const useCoursesStore = create<CourseStore>((set) => ({
  courses: [],
  courseLoading: false,
  courseError: null,
  fetchCourses: async () => {
    set({ courseLoading: true, courseError: null });
    try {
      const response = await axios.get(`${BASE_URL}/courses`);
      const coursesData = response.data.data ?? [];
      set({ courses: coursesData, courseLoading: false });
    } catch {
      set({
        courseError: "Failed to fetch courses",
        courseLoading: false,
        courses: [],
      });
    }
  },
}));
