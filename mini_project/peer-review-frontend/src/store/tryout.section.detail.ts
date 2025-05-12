import { create } from "zustand";
import axios from "axios";
import type TryoutSectionDetailStore from "../interfaces/stores/tryout.section.detail.store.interface";

const BASE_URL = "http://localhost:3000/api";

export const useTryoutSectionsStore = create<TryoutSectionDetailStore>(
  (set) => ({
    tryoutSection: null,
    tryoutSectionloading: false,
    tryoutSectionError: null,
    fetchTryoutSectionDetail: async (id: string) => {
      set({ tryoutSectionloading: true, tryoutSectionError: null });
      try {
        const response = await axios.get(`${BASE_URL}/tryout-sections/${id}`);
        const tryoutSection = response.data.data ?? null;
        set({ tryoutSection: tryoutSection, tryoutSectionloading: false });
      } catch {
        set({
          tryoutSectionError: "Failed to fetch tryout sections",
          tryoutSectionloading: false,
          tryoutSection: null,
        });
      }
    },
  })
);
