import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import http from "../../http-common";

export const getAllUsers = createAsyncThunk(
  "users/fetchAll",
  async () => {
    try {
      const response = await http.get("/users");
      return response;
    } catch (err) {
      if (!err.response) {
        throw err;
      }
      Promise.reject(err.response);
    }
  }
);

export const getAllUsersSlice = createSlice({
  name: "getAllUsers",
  initialState: {
    loading: false,
    error: null,
    usersData: [],
  },
  reducers: {},
  extraReducers: {
    [getAllUsers.pending]: (state, action) => {
      state.loading = true;
      state.error = null;
      state.usersData = [];
    },
    [getAllUsers.fulfilled]: (state, action) => {
      state.loading = false;
      state.error = null;
      state.usersData = action.payload;
    },
    [getAllUsers.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.usersData = [];
    },
  },
});

export const selectGetAllUsers = (state) => state.getAllUsers;
export default getAllUsersSlice.reducer;
