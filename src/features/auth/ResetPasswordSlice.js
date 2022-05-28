import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import http from "../../http-common";

export const resetPassword = createAsyncThunk(
  "user/resetPassword",
  async (data, { rejectWithValue }) => {
    try {
      const response = await http.put("/users/reset-password", data);
      localStorage.clear();
      return response;
    } catch (err) {
      if (!err.response) {
        throw err;
      }
      return rejectWithValue(err.response);
    }
  }
);

export const resetPasswordSlice = createSlice({
  name: "resetPassword",
  initialState: {
    loading: false,
    error: null,
    data: [],
  },
  reducers: {},
  extraReducers: {
    [resetPassword.pending]: (state, action) => {
      state.loading = true;
      state.error = null;
      state.data = [];
    },
    [resetPassword.fulfilled]: (state, action) => {
      state.loading = false;
      state.error = null;
      state.data = action.payload;
    },
    [resetPassword.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.data = [];
    },
  },
});

export const selectresetPassword = (state) => state.resetPassword;
export default resetPasswordSlice.reducer;
