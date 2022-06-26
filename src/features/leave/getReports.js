import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import http from "../../http-common";

export const getReport = createAsyncThunk(
  "report/fetchAll",
  async () => {
    try {
      const response = await http.get("/reports");
      return response;
    } catch (err) {
      if (!err.response) {
        throw err;
      }
      Promise.reject(err.response);
    }
  }
);

export const reportSlice = createSlice({
  name: "getReport",
  initialState: {
    loading: false,
    error: null,
    report: [],
  },
  reducers: {},
  extraReducers: {
    [getReport.pending]: (state, action) => {
      state.loading = true;
      state.error = null;
      state.report = [];
    },
    [getReport.fulfilled]: (state, action) => {
      state.loading = false;
      state.error = null;
      state.report = action.payload;
    },
    [getReport.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.report = [];
    },
  },
});

export const selectGetReport = (state) => state.getReport;
export const getReportReducer = reportSlice.reducer;
