import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  user: {},
  isLoggedIn: false,
  loading: false,
  error: null,
};

export const loginUserAsync = createAsyncThunk(
  "user/loginUserAsync",
  async (userObject, { rejectWithValue }) => {
    const requestObject = {
      email: userObject.email,
      name: userObject.email.split("@")[0],
      password: userObject.password,
      confirmPassword: userObject.password,
    };

    return await axios
      .post("https://localhost:5001/api/User/login", userObject)
      .then((res) => {
        if (res.status === 200) return { data: requestObject };
      })
      .catch((err) => {
        console.log(err);
        return rejectWithValue(err.response.data);
      });
  }
);

export const registerUserAsync = createAsyncThunk(
  "user/registerUserAsync",
  async (userObject, { rejectWithValue }) => {
    const requestObject = {
      email: userObject.email,
      name: userObject.email.split("@")[0],
      password: userObject.password,
      confirmPassword: userObject.password,
    };

    return await axios
      .post("https://localhost:5001/api/User/register", requestObject)
      .then((res) => {
        if (res.status === 200) return { data: requestObject };
      })
      .catch((err) => {
        return rejectWithValue(err.response.data);
      });
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  extraReducers: {
    [loginUserAsync.fulfilled]: (state, action) => {
      state.user = action.payload.data;
      localStorage.setItem("userEmail", action.payload.data.email);
      localStorage.setItem("userName", action.payload.data.name);
      localStorage.setItem("isLoggedIn", true);
      state.isLoggedIn = true;
      state.loading = false;
      state.error = null;
    },
    [loginUserAsync.pending]: (state, action) => {
      state.loading = true;
      state.isLoggedIn = false;
      state.error = null;
      state.user = null;
    },
    [loginUserAsync.rejected]: (state, action) => {
      state.loading = false;
      state.isLoggedIn = false;
      state.error = action.payload;
      state.user = null;
    },
    [registerUserAsync.fulfilled]: (state, action) => {
      state.user = action.payload.data;
      // localStorage.setItem("userEmail", action.payload.data.email);
      // localStorage.setItem("userName", action.payload.data.name);
      // localStorage.setItem("isLoggedIn", true);
      state.isLoggedIn = true;
      state.loading = false;
      state.error = null;
    },
    [registerUserAsync.pending]: (state, action) => {
      state.loading = true;
      state.isLoggedIn = false;
      state.error = null;
      state.user = null;
    },
    [registerUserAsync.rejected]: (state, action) => {
      state.loading = false;
      state.isLoggedIn = false;
      state.error = action.payload;
      state.user = null;
    },
  },
});

export const selectUser = (state) => state.user.user;
export const selectUserLoading = (state) => state.user.loading;
export const selectUserError = (state) => state.user.error;
export const selectUserIsLoggedIn = (state) => state.user.isLoggedIn;

export default userSlice.reducer;
