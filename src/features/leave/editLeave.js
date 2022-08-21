import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import http from "../../http-common";

export const editLeave = createAsyncThunk(
  "request/edit",
  async (data, { rejectWithValue }) => {
    try {
      const response = await http.patch(`/requests/${data.id}`, {
        numberOfDays: data.numberOfDays,
        reason: data.reason,
        startDate: data.startDate,
        type: data.type,
      });
      return response;
    } catch (err) {
      if (!err.response) {
        throw err;
      }
      return rejectWithValue(err.response);
    }
  }
);

export const editLeaveSlice = createSlice({
  name: "editLeave",
  initialState: {
    loading: false,
    error: null,
    data: [],
  },
  reducers: {},
  extraReducers: {
    [editLeave.pending]: (state, action) => {
      state.loading = true;
      state.error = null;
      state.data = [];
    },
    [editLeave.fulfilled]: (state, action) => {
      state.loading = false;
      state.error = null;
      state.data = action.payload;
    },
    [editLeave.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.data = [];
    },
  },
});

export const selectEditLeave = (state) => state.editLeave;
export default editLeaveSlice.reducer;
