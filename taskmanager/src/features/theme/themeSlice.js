// features/theme/themeSlice.js
import { createSlice } from '@reduxjs/toolkit';

const themeSlice = createSlice({
  name: 'theme',
  initialState: 'light', // По умолчанию светлая тема
  reducers: {
    toggleTheme: (state) => {
      return state === 'light' ? 'dark' : 'light';
    },
  },
});

export const { toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;
