// loadingBarSlice.js
import { createSlice } from "@reduxjs/toolkit";

const loadingBarSlice = createSlice({
  name: "loadingBar",
  initialState: { progress: 0 },
  reducers: {
    setProgress: (state, action) => {
      state.progress = action.payload;
    },
  },
});

export const { setProgress } = loadingBarSlice.actions;

export default loadingBarSlice.reducer;
