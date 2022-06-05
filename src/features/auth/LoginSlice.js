import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import http from "../../http-common";

export const login = createAsyncThunk(
  "user/login",
  async (data, { rejectWithValue }) => {
    try {
      const response = await http.post("/users/login", data);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", response.data.user.name);
      return response;
    } catch (err) {
      if (!err.response) {
        throw err;
      }
      return rejectWithValue(err.response);
    }
  }
);

export const loginSlice = createSlice({
  name: "login",
  initialState: {
    loading: false,
    error: null,
    data: [],
  },
  reducers: {},
  extraReducers: {
    [login.pending]: (state, action) => {
      state.loading = true;
      state.error = null;
      state.data = [];
    },
    [login.fulfilled]: (state, action) => {
      state.loading = false;
      state.error = null;
      state.data = action.payload;
    },
    [login.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.data = [];
    },
  },
});

export const selectLogin = (state) => state.login;
export default loginSlice.reducer;
