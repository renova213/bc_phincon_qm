import { create } from "zustand";
import axios from "axios";
import type CourseDetailStore from "../interfaces/stores/course.detail.store.interface";

const BASE_URL = "http://localhost:3000/api";

export const useCourseDetailStore = create<CourseDetailStore>((set) => ({
  course: null,
  courseLoading: false,
  courseError: null,
  fetchCourseDetail: async (id) => {
    set({ courseLoading: true, courseError: null });
    try {
      const response = await axios.get(`${BASE_URL}/courses/${id}`);
      const courseData = response.data.data ?? null;
      set({ course: courseData, courseLoading: false });
    } catch {
      set({
        courseError: "Failed to fetch course details",
        courseLoading: false,
        course: null,
      });
    }
  },
}));
