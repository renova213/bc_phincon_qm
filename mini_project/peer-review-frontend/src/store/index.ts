import { configureStore } from "@reduxjs/toolkit";
import type { TypedUseSelectorHook } from "react-redux";
import { useDispatch, useSelector } from "react-redux";
import type { Review } from "../types/review.types";
import courseReducer from "./slices/courseSlice";
import reviewReducer from "./slices/reviewSlice";
import tryoutReducer from "./slices/tryoutSlice";

export interface RootState {
  reviews: {
    appReviews: Review[];
    courseReviews: Review[];
    tryoutReviews: Review[];
    loading: boolean;
    error: string | null;
  };
}

export const store = configureStore({
  reducer: {
    courses: courseReducer,
    reviews: reviewReducer,
    tryouts: tryoutReducer,
  },
});

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
