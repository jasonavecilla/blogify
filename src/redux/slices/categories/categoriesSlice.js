import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

import {
  resetErrorAction,
  resetSuccesAction,
} from "../globalSlice/globalSlice";
import BASE_URL from "../../../utils/baseURL";

//initialstate
const INITIAL_STATE = {
  loading: false,
  error: null,
  categories: [],
  category: null,
  success: false,
};

//!Fetch categories
export const fetchCategoriesAction = createAsyncThunk(
  "categories/lists",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await axios.get(`${BASE_URL}/categories`);
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

//! categories slices
const categoriesSlice = createSlice({
  name: "posts",
  initialState: INITIAL_STATE,
  extraReducers: (builder) => {
    //fetch categories
    builder.addCase(fetchCategoriesAction.pending, (state, action) => {
      state.loading = true;
    });
    //handle fulfilled state
    builder.addCase(fetchCategoriesAction.fulfilled, (state, action) => {
      state.categories = action.payload;
      state.success = true;
      state.loading = false;
      state.error = null;
    });
    //* Handle the rejection
    builder.addCase(fetchCategoriesAction.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });

    //! Reset error action
    builder.addCase(resetErrorAction.fulfilled, (state) => {
      state.error = null;
    });
    //! Reset success action
    builder.addCase(resetSuccesAction.fulfilled, (state) => {
      state.success = false;
    });
  },
});

//! generate reducer
const categoriesReducer = categoriesSlice.reducer;

export default categoriesReducer;
