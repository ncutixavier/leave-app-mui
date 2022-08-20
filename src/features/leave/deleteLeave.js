import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import http from "../../http-common";

export const deleteLeave = createAsyncThunk(
  "request/delete",
  async (id, { rejectWithValue }) => {
    try {
      const response = await http.delete(`/requests/${id}`);
      return response;
    } catch (err) {
      if (!err.response) {
        throw err;
      }
      return rejectWithValue(err.response);
    }
  }
);

export const deleteLeaveSlice = createSlice({
  name: "deleteLeave",
  initialState: {
    loading: false,
    error: null,
    data: [],
  },
  reducers: {},
  extraReducers: {
    [deleteLeave.pending]: (state, action) => {
      state.loading = true;
      state.error = null;
      state.data = [];
    },
    [deleteLeave.fulfilled]: (state, action) => {
      state.loading = false;
      state.error = null;
      state.data = action.payload;
    },
    [deleteLeave.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.data = [];
    },
  },
});

export const selectDeleteLeave = (state) => state.deleteLeave;
export default deleteLeaveSlice.reducer;
