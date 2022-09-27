import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  challenges: [],
  loading: false,
  error: null,
};

export const getChallengesAsync = createAsyncThunk(
  "challenges/getChallengesAsync",
  async (thunkAPI) => {
    return await axios
      .get("https://localhost:5001/api/Challanges", thunkAPI)
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        return err.message;
      });
  }
);

export const challengesSlice = createSlice({
  name: "challenges",
  initialState,
  extraReducers: {
    [getChallengesAsync.fulfilled]: (state, action) => {
      state.challenges = action.payload;
      state.loading = false;
      state.error = null;
    },
    [getChallengesAsync.pending]: (state, action) => {
      state.loading = true;
      state.error = null;
      state.challenges = null;
    },
    [getChallengesAsync.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.challenges = null;
    },
  },
});

export const selectChallenges = (state) => state.challenges.challenges;
export const selectChallengesLoading = (state) => state.challenges.loading;
export const selectChallengesError = (state) => state.challenges.error;

export default challengesSlice.reducer;
