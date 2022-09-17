import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  user: [],
  loading: false,
  error: null,
};

export const getUsersAsync = createAsyncThunk(
  "users/getUsersAsync",
  async (thunkAPI) => {
    return await axios
      .get("https://jsonplaceholder.typicode.com/users", thunkAPI)
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        return err.message;
      });
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  extraReducers: {
    [getUsersAsync.fulfilled]: (state, action) => {
      console.log(action);
      state.user = action.payload;
      state.loading = false;
      state.error = null;
    },
    [getUsersAsync.pending]: (state, action) => {
      state.loading = true;
      state.error = null;
      state.user = null;
    },
    [getUsersAsync.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.user = null;
    },
  },
});

export const selectUsers = (state) => state.user;

export default userSlice.reducer;
