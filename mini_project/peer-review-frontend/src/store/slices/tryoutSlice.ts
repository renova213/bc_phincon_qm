import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as api from "../../services/api";
import type { TryoutSection } from "../../types/review.types";

interface TryoutState {
  tryoutSections: TryoutSection[];
  currentTryoutSection: TryoutSection | null;
  loading: boolean;
  error: string | null;
}

const initialState: TryoutState = {
  tryoutSections: [],
  currentTryoutSection: null,
  loading: false,
  error: null,
};

export const fetchTryoutSections = createAsyncThunk(
  "tryouts/fetchAll",
  async () => {
    const response = await api.getTryoutSections();
    return response.data.data;
  }
);

export const fetchTryoutSectionById = createAsyncThunk(
  "tryouts/fetchById",
  async (tryoutSectionId: string) => {
    const response = await api.getTryoutSectionById(tryoutSectionId);
    return response.data.data;
  }
);

const tryoutSlice = createSlice({
  name: "tryouts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTryoutSections.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTryoutSections.fulfilled, (state, action) => {
        state.loading = false;
        state.tryoutSections = action.payload;
      })
      .addCase(fetchTryoutSections.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch tryout sections";
      })
      .addCase(fetchTryoutSectionById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTryoutSectionById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentTryoutSection = action.payload;
      })
      .addCase(fetchTryoutSectionById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch tryout section";
      });
  },
});

export default tryoutSlice.reducer;
