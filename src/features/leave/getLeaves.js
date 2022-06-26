import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import http from "../../http-common";

export const getLeaves = createAsyncThunk(
  "leave/fetchAll",
  async () => {
    try {
      const response = await http.get("/requests");
      return response;
    } catch (err) {
      if (!err.response) {
        throw err;
      }
      Promise.reject(err.response);
    }
  }
);

export const leaveSlice = createSlice({
  name: "getLeaves",
  initialState: {
    loading: false,
    error: null,
    leaves: [],
  },
  reducers: {},
  extraReducers: {
    [getLeaves.pending]: (state, action) => {
      state.loading = true;
      state.error = null;
      state.leaves = [];
    },
    [getLeaves.fulfilled]: (state, action) => {
      state.loading = false;
      state.error = null;
      state.leaves = action.payload;
    },
    [getLeaves.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.leaves = [];
    },
  },
});

export const selectGetLeaves = (state) => state.getLeaves;
export const getLeavesReducer = leaveSlice.reducer;
