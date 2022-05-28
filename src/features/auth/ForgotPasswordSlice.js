import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import http from "../../http-common";

export const forgotPassword = createAsyncThunk(
  "user/forgotPassword",
  async (data, { rejectWithValue }) => {
    try {
      const response = await http.put("/users/forgot-password", data);
      localStorage.setItem("email", data.email);
      return response;
    } catch (err) {
      if (!err.response) {
        throw err;
      }
      return rejectWithValue(err.response);
    }
  }
);

export const forgotPasswordSlice = createSlice({
  name: "forgotPassword",
  initialState: {
    loading: false,
    error: null,
    data: [],
  },
  reducers: {},
  extraReducers: {
    [forgotPassword.pending]: (state, action) => {
      state.loading = true;
      state.error = null;
      state.data = [];
    },
    [forgotPassword.fulfilled]: (state, action) => {
      state.loading = false;
      state.error = null;
      state.data = action.payload;
    },
    [forgotPassword.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.data = [];
    },
  },
});

export const selectForgotPassword = (state) => state.forgotPassword;
export default forgotPasswordSlice.reducer;
