import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { BlogData } from "@/api/blog";

export type GenerationMethod = "website" | "custom" | "trending" | undefined;

export interface GenerationParams {
  selectedOption?: GenerationMethod;
  websiteUrl?: string;
  customTopic?: string;
  selectedTrend?: string;
  region?: string;
  category?: string;
}

export interface GenerationState {
  params: GenerationParams | null;
  blog: BlogData | null;
  trendTopic?: string;
  trendKeywords?: string[];
}

const initialState: GenerationState = {
  params: null,
  blog: null,
};

const generationSlice = createSlice({
  name: "generation",
  initialState,
  reducers: {
    setParams(state, action: PayloadAction<GenerationParams>) {
      state.params = action.payload;
    },
    setBlog(state, action: PayloadAction<BlogData | null>) {
      state.blog = action.payload;
    },
    setTrendData(state, action: PayloadAction<{ topic?: string; keywords?: string[] }>) {
      state.trendTopic = action.payload.topic;
      state.trendKeywords = action.payload.keywords;
    },
    clearAll(state) {
      state.params = null;
      state.blog = null;
      state.trendTopic = undefined;
      state.trendKeywords = undefined;
    },
  },
});

export const { setParams, setBlog, setTrendData, clearAll } = generationSlice.actions;
export default generationSlice.reducer;


