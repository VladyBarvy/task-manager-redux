import { configureStore } from '@reduxjs/toolkit';
import tasksReducer from '../features/tasks/tasksSlice.js';
import weatherReducer from "../features/weather/weatherSlice.js";
import themeReducer from "../features/theme/themeSlice.js"; // Импортируем срез темы


export const store = configureStore({
  reducer: {
    tasks: tasksReducer,
    weather: weatherReducer,
    theme: themeReducer, // Добавляем срез темы
  },
});
