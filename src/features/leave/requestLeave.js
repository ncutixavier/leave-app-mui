import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import http from "../../http-common";

export const requestLeave = createAsyncThunk(
  "request/add",
  async (data, { rejectWithValue }) => {
    try {
      const response = await http.post("/requests", data);
      return response;
    } catch (err) {
      if (!err.response) {
        throw err;
      }
      return rejectWithValue(err.response);
    }
  }
);

export const requestLeaveSlice = createSlice({
  name: "requestLeave",
  initialState: {
    loading: false,
    error: null,
    data: [],
  },
  reducers: {},
  extraReducers: {
    [requestLeave.pending]: (state, action) => {
      state.loading = true;
      state.error = null;
      state.data = [];
    },
    [requestLeave.fulfilled]: (state, action) => {
      state.loading = false;
      state.error = null;
      state.data = action.payload;
    },
    [requestLeave.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.data = [];
    },
  },
});

export const selectRequestLeave = (state) => state.requestLeave;
export default requestLeaveSlice.reducer;
