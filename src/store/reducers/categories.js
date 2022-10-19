import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  categories: [],
  loading: false,
  error: null,
};

export const getCategoriesAsync = createAsyncThunk(
  "categories/getCategoriesAsync",
  async (thunkAPI) => {
    return await axios
      .get("https://localhost:5001/api/Categories", thunkAPI)
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        return err.message;
      });
  }
);

export const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  extraReducers: {
    [getCategoriesAsync.fulfilled]: (state, action) => {
      state.categories = action.payload;
      state.categories.unshift("Recommended");
      state.loading = false;
      state.error = null;
    },
    [getCategoriesAsync.pending]: (state, action) => {
      state.loading = true;
      state.error = null;
      state.categories = null;
    },
    [getCategoriesAsync.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.categories = null;
    },
  },
});

export const selectCategories = (state) => state.categories.categories;
export const selectCategoriesLoading = (state) => state.categories.loading;
export const selectCategoriesError = (state) => state.categories.error;

export default categoriesSlice.reducer;
