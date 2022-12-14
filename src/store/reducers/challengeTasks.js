import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  tasks: [],
  loading: false,
  error: null,
};

export const getChallengeTasksAsync = createAsyncThunk(
  "tasks/getChallengeTasksAsync",
  async ({ challengeId, userEmail }, thunkAPI) => {
    const requestTasksObject = {
      challangeId: challengeId,
      loggedInUserEmail: userEmail,
    };
    return await axios
      .post(
        `https://localhost:5001/api/ChallangeTasks`,
        requestTasksObject,
        thunkAPI
      )
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        return err.message;
      });
  }
);

export const challengeTasksSlice = createSlice({
  name: "tasks",
  initialState,
  extraReducers: {
    [getChallengeTasksAsync.fulfilled]: (state, action) => {
      state.tasks = action.payload;
      state.loading = false;
      state.error = null;
    },
    [getChallengeTasksAsync.pending]: (state, action) => {
      state.loading = true;
      state.error = null;
      state.tasks = null;
    },
    [getChallengeTasksAsync.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.tasks = null;
    },
  },
});

export const selectTasks = (state) => state.tasks.tasks;
export const selectTasksLoading = (state) => state.tasks.loading;
export const selectTasksError = (state) => state.tasks.error;

export default challengeTasksSlice.reducer;
