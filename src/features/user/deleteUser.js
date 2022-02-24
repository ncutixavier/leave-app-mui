import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import http from "../../http-common";

export const deleteUser = createAsyncThunk(
  "users/delete",
  async (id,{ rejectWithValue }) => {
    try {
      const response = await http.delete(`/users/${id}`);
      return response;
    } catch (err) {
      if (!err.response) {
        throw err;
      }
      return rejectWithValue(err.response);
    }
  }
);

export const deleteUserSlice = createSlice({
  name: "deleteUser",
  initialState: {
    loading: false,
    error: null,
    data: [],
  },
  reducers: {},
  extraReducers: {
    [deleteUser.pending]: (state, action) => {
      state.loading = true;
      state.error = null;
      state.data = [];
    },
    [deleteUser.fulfilled]: (state, action) => {
      state.loading = false;
      state.error = null;
      state.data = action.payload;
    },
    [deleteUser.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.data = [];
    },
  },
});

export const selectDeleteUser = (state) => state.deleteUser;
export default deleteUserSlice.reducer;
