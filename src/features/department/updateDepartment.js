import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import http from "../../http-common";

export const updateDepartment = createAsyncThunk(
  "department/update",
  async (data,{ rejectWithValue }) => {
    try {
      const response = await http.patch(`/departments/${data.id}`, {
        name: data.name,
        supervisor_name: data.supervisor_name,
        supervisor_email: data.supervisor_email,
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

export const updateDepartmentSlice = createSlice({
  name: "updateDepartment",
  initialState: {
    loading: false,
    error: null,
    data: [],
  },
  reducers: {},
  extraReducers: {
    [updateDepartment.pending]: (state, action) => {
      state.loading = true;
      state.error = null;
      state.data = [];
    },
    [updateDepartment.fulfilled]: (state, action) => {
      state.loading = false;
      state.error = null;
      state.data = action.payload;
    },
    [updateDepartment.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.data = [];
    },
  },
});

export const selectUpdateDepartment = (state) => state.updateDepartment;
export default updateDepartmentSlice.reducer;
