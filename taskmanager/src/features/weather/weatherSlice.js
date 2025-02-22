import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const API_KEY = "1534fae249c04858b82121313241410";
const API_URL = `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=Tokyo&aqi=no`;

export const fetchWeather = createAsyncThunk("weather/fetchWeather", async () => {
  const response = await fetch(API_URL);
  const data = await response.json();
  return {
    temperature: data.current.temp_c,
    condition: data.current.condition.text,
  };
});

const weatherSlice = createSlice({
  name: "weather",
  initialState: {
    temperature: null,
    condition: "",
    status: "idle",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeather.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchWeather.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.temperature = action.payload.temperature;
        state.condition = action.payload.condition;
      })
      .addCase(fetchWeather.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export default weatherSlice.reducer;
