import { configureStore } from '@reduxjs/toolkit';
import tasksReducer from '../features/tasks/tasksSlice.js';
import weatherReducer from "../features/weather/weatherSlice.js";

export const store = configureStore({
  reducer: {
    tasks: tasksReducer,
    weather: weatherReducer,
  },
});
